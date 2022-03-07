import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  message: String;
}

export function SignUpAlert(props: SignUpData) {
  const { message } = props;
  if (message !== null) {
    return (
      <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
        <Alert severity="success">{message}</Alert>
      </Stack>
    );
  } else {
    return <></>;
  }
}

export default SignUpAlert;
