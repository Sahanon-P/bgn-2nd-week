import Header from "@components/Header";
import { Boardgames } from "@models/boardgames";
import { Container, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "@components/Comment";
import CreateComment from "@components/CreateComment";

export default function Detail() {
  const { id } = useParams();
  const [data, setData] = useState<Boardgames>();
  const [comments, setComments] = useState<
    { id: string, username: string; comment: string }[]
  >([]);
  const imagePath =
    "https://img.freepik.com/premium-photo/poker-table-colorful-dice_875722-13208.jpg";

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/boardgames/id/${id}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_SERVER_API_KEY,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/boardgames/comment/${id}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_SERVER_API_KEY,
        },
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      });
  },[id]);
  return (
    <Fragment>
      <Container
        maxWidth="xl"
        sx={{
          height: "15%",
          backgroundImage: `linear-gradient(to right, rgba(19,0,32,1) 50%, rgba(253,252,255,0) 88%, rgba(255,255,255,0) 100%), url(${imagePath})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <Stack padding={10} display={"flex"} direction={"row"} spacing={3}>
          <img src={data?.image} width={300} height={300}></img>
          <Stack justifyContent={"space-between"}>
            <Typography variant="h3" color={"white"}>
              {`${data?.name} (${data?.yearpublished})`}
            </Typography>

            <Stack direction={"row"} spacing={3}>
              <Stack>
                <Typography color={"white"} fontWeight={"bold"} variant="h6">
                  {`${data?.minplayers} - ${data?.maxplayers}`}
                </Typography>
                <Typography color={"white"}>Players</Typography>
              </Stack>
              <Stack>
                <Typography color={"white"} fontWeight={"bold"} variant="h6">
                  {`${data?.minplaytime} - ${data?.maxplaytime}`} mins
                </Typography>
                <Typography color={"white"}>Playing Times</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Stack margin={3} padding={5} spacing={2}>
        <Typography color={"white"} variant="h6">
          Description
        </Typography>
        <Divider sx={{ bgcolor: "grey", width: "100%" }}></Divider>
        <div
          style={{ color: "white" }}
          dangerouslySetInnerHTML={{
            __html: data?.description || <p>no description</p>,
          }}
        ></div>
      </Stack>
      <Stack marginTop={3} padding={5} spacing={2}>
        <Divider sx={{ bgcolor: "grey", width: "100%" }}></Divider>
        <Typography color={"white"} variant="h6">
          Comment
        </Typography>
        <CreateComment id={id || ''} />
        {comments.length === 0 && (
          <Typography color={"white"} variant="h6">
            No comment
          </Typography>
        )}
        {comments.map((comment) => (
          <Comment key={comment.id} username={comment.username} comment={comment.comment} />
        ))}
      </Stack>
    </Fragment>
  );
}
