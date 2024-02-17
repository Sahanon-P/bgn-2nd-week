import { useState } from "react";
import "./App.css";
import { Box, Button, Stack, Typography } from "@mui/material";

function App() {
  const [count, setCount] = useState(1);
  const imagePath =
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/518d5591985829.5e40260db8693.gif";

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      marginTop={"5%"}
    >
      <Stack alignItems={"center"} spacing={2}>
        <img src={imagePath} width={600} height={500}></img>
        <Typography variant="h3">Will you be my valentine?</Typography>
        <Stack direction={"row"} spacing={2}>
          <Button
            color="success"
            variant="contained"
            sx={{ width: count * 100, height: count * 100 }}
          >
            Yes
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            No
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default App;
