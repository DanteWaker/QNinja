import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AxiosResponse } from "axios";

interface LoginAlertData {
  authResponse: AxiosResponse;
}

export function LoginAlert(props: LoginAlertData) {
  const { authResponse } = props;

  if (authResponse.status === 400) {
    const messages: string[] = [];

    // Loop through authResponse.data keys and add to messages array
    for (const key in authResponse.data) {
      messages.push(authResponse.data[key]);
    }

    return (
      <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
        {messages.map((message, index) => (
          <Alert key={index} severity="error" variant="filled">
            {message}
          </Alert>
        ))}
      </Stack>
    );
  } else {
    return <></>;
  }
}

export default LoginAlert;
