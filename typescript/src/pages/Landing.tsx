import Header from "@components/Header";
import {
  Button,
  Container,
  Grid,
  Grow,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { CustomCard } from "@components/CardHighlight";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import axios from "axios";
import { Boardgames } from "@models/boardgames";
import SearchModal from "@components/Search";

const imagePath =
  "https://img.freepik.com/premium-photo/poker-table-colorful-dice_875722-13208.jpg";
export default function Landing() {
  const [checked, setChecked] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Boardgames[]>([]);
  const filteredData = data.filter((bg) => bg.yearpublished === "2023");
  const pagination = filteredData.slice((page - 1) * 3, page * 3);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchFilteredData = data.filter((bg) =>
    bg.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  function nextPage() {
    setChecked(false);
    setTimeout(() => {
      setPage(page + 1);
      setChecked(true);
    }, 300);
  }
  function previousPage() {
    setChecked(false);
    setTimeout(() => {
      setPage(page - 1);
      setChecked(true);
    }, 300);
  }
  function preventExceedPage() {
    return page === Math.round(filteredData.length / 3);
  }
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/boardgames/all`, {
        headers: {
          "x-api-key": import.meta.env.VITE_SERVER_API_KEY,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <Fragment>
      <Container
        maxWidth="xl"
        sx={{
          height: 400,
          backgroundImage: `linear-gradient(to right, rgba(19,0,32,1) 50%, rgba(253,252,255,0) 88%, rgba(255,255,255,0) 100%), url(${imagePath})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <Slide
          direction="down"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Stack padding={10} display="flex">
            <Typography variant="h4" color={"white"} fontWeight={"bold"}>
              FIND YOUR BOARDGAMES
            </Typography>
            <Typography variant="h2" color={"white"} fontWeight={"bold"}>
              BOARDGAMESNERD
            </Typography>
            <Typography variant="h6" color={"white"}>
              Replica of BoardGamesGeek
            </Typography>
            <Stack direction={"row"} paddingTop={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
              >
                Explore
              </Button>
            </Stack>
          </Stack>
        </Slide>
      </Container>
      <Container sx={{ paddingTop: 5 }}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <PlayArrowIcon color="secondary" fontSize="large" />
          <Typography variant="h4" color={"white"}>
            LATEST BOARDGAMES OF 2023
          </Typography>
        </Stack>
        <Stack justifyContent={"end"} direction={"row"} spacing={2} padding={2}>
          <IconButton onClick={previousPage} disabled={page === 1}>
            <ArrowCircleLeftIcon
              sx={{ fontSize: 40 }}
              color={page === 1 ? "disabled" : "secondary"}
            />
          </IconButton>
          <IconButton onClick={nextPage} disabled={preventExceedPage()}>
            <ArrowCircleRightIcon
              sx={{ fontSize: 40 }}
              color={preventExceedPage() ? "disabled" : "secondary"}
            />
          </IconButton>
        </Stack>
        {pagination.length === 0 && (
          <Typography
            color={"white"}
            variant="h4"
            sx={{ textAlign: "center", paddingTop: 5 }}
          >
            No information right now
          </Typography>
        )}
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 2000 } : {})}
        >
          <Grid
            container
            direction={"row"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            marginTop={2}
            marginBottom={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            rowSpacing={5}
          >
            {pagination.map((bg) => (
              <Grid item key={bg.id}>
                <CustomCard
                  id= {bg.id}
                  color="#1a1b4d"
                  playtime={`${bg.minplaytime} - ${bg.maxplaytime}`}
                  players={`${bg.minplayers} - ${bg.maxplayers}`}
                  date={bg.yearpublished}
                  cover={bg.image}
                  logo={bg.image}
                  title={bg.name}
                  description={bg.description}
                />
              </Grid>
            ))}
          </Grid>
        </Grow>
      </Container>
      <SearchModal
        open={open}
        handleClose={() => setOpen(false)}
        data={searchFilteredData.slice(0, 10)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </Fragment>
  );
}
