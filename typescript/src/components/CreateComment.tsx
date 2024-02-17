import useStore from "@middlewares/store";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface CommentForm {
  comment: string;
}
export default function CreateComment({ id }: { id: string }) {
  const form = useForm<CommentForm>({
    defaultValues: {
      comment: "",
    },
  });
  const { register, handleSubmit } = form;
  const navigation = useNavigate();
  const token = useStore((state) => state.token);
  const onSubmit = (data: { comment: string }) => {
    if (token.access_token === "") {
      alert("Please Login before comment");
      navigation("/login");
    } else {
      axios
        .post(
          `${import.meta.env.VITE_SERVER}/boardgames/comment`,
          {
            comment: data.comment,
            boardGameId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "x-api-key": import.meta.env.VITE_SERVER_API_KEY,
            },
          }
        )
        .then((res) => {
          if (res.data) {
            window.location.reload();
          }
        });
    }
  };
  return (
    <Card elevation={0} sx={{ padding: 2, borderRadius: "16px" }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent sx={{ pr: 2 }}>
          <Box mb={1}></Box>
          <TextField
            placeholder="Type down your comment"
            multiline
            rows={4}
            fullWidth
            {...register("comment")}
          ></TextField>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </Box>
        </CardContent>
      </form>
    </Card>
  );
}
