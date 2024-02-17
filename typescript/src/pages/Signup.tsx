import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import Logo from "@assets/logo.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

interface SignupForm {
  email: string;
  password: string;
  username: string;
}
export default function Signup() {
  const form = useForm<SignupForm>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: SignupForm) => {
    axios.post(`${import.meta.env.VITE_SERVER}/auth/signup`, data, {
      headers: {
        "x-api-key": import.meta.env.VITE_SERVER_API_KEY,
      },
    }).then((res) => {
        console.log(res.data);
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
          height={400}
          border={1}
          borderRadius={2}
          color={"white"}
          bgcolor={"white"}
          padding={5}
          spacing={2}
          alignItems={"center"}
        >
          <img src={Logo} height={50} width={50}></img>
          <Typography color={"black"}>Sign Up</Typography>
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
          <TextField
            label="Username *"
            fullWidth
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Signup
          </Button>
          <Link to="/login">Already have an account? Log in!</Link>
        </Stack>
      </form>
    </Box>
  );
}
