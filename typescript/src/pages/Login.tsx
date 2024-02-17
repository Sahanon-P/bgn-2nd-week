import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import Logo from "@assets/logo.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useStore from "@middlewares/store";

interface LoginForm {
  email: string;
  password: string;
}
export default function Login() {
  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const setToken = useStore((state) => state.setToken);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: LoginForm) => {
    axios
      .post(`${import.meta.env.VITE_SERVER}/auth/login`, data)
      .then((res) => {
        setToken(res.data);
        window.location.href = "/";
      });
  };

  return (
    <Box
      marginTop={10}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          width={600}
          height={350}
          border={1}
          borderRadius={2}
          color={"white"}
          bgcolor={"white"}
          padding={5}
          spacing={2}
          alignItems={"center"}
        >
          <img src={Logo} height={50} width={50}></img>
          <Typography color={"black"}>Sign In</Typography>
          <TextField
            label="Email Address *"
            fullWidth
            type="email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            label="Password *"
            fullWidth
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Login
          </Button>
          <Link to="/signup">Don't have an account? Sign up!</Link>
        </Stack>
      </form>
    </Box>
  );
}
