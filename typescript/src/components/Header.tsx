import {
  AppBar,
  Button,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Logo from "@assets/logo.png";
import { useNavigate } from "react-router-dom";
import useStore from "@middlewares/store";
export default function Header() {
  const navigation = useNavigate();
  const token = useStore((state) => state.token);
  let user = {id : '', email: '', username: ''};
  if (token.access_token !== ''){
    user = jwtDecode(token.access_token);
  }
  const signout = () => {
    localStorage.clear();
    window.location.href="/";
  }

  return (
    <AppBar position="static" sx={{ background: "transparent" }}>
      <Toolbar>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <img src={Logo} height={50} width={50}></img>
              <Typography>BGN</Typography>
            </Stack>
          </Grid>
          <Grid item>
            {token.access_token !== '' ? (
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Typography>Hi, {user.username}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={signout}
                >
                  Sign Out
                </Button>
              </Stack>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigation("/login");
                }}
              >
                Sign In
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
