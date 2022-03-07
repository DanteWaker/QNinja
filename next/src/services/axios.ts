import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "nextauth.token": token } = parseCookies(ctx);

  // TODO: Load hostname from env
  const api = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://qninja.herokuapp.com/api/"
        : "http://localhost:8000/api/",
  });

  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        destroyCookie(null, "nextauth.token");
      }
      return Promise.reject(error);
    }
  );

  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  }

  return api;
}
