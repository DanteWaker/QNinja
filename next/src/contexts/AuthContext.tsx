import axios, { AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { api } from "../services/api";
import { User } from "../interfaces/User";

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<AxiosResponse>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  function getUser() {
    api
      .get("users/me/")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setUser(null);
          destroyCookie(null, "nextauth.token");
        }
      });
  }

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      getUser();
    }
  }, []);

  async function handleLogout() {
    await destroyCookie(null, "nextauth.token");

    setUser(null);

    router.push("/login");
  }

  async function signIn({ email, password }: SignInData): Promise<AxiosResponse> {
    try {
      const response = await api.post("token/login/", { email, password });
      const token = response.data.authToken;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 1, // 1 day
        sameSite: "lax",
      });

      api.defaults.headers.common["Authorization"] = `Token ${token}`;

      await getUser();

      router.push("/temas");

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If the error is a AxiosError, then we can get the response
        if (error.response && error.response.status === 400) {
          // If we have a response and the error is Bad Request, then we return the response
          return error.response;
        }
        throw error;
      }
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
