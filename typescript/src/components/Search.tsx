import {
  Backdrop,
  Divider,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Boardgames } from "@models/boardgames";
import { CustomCard } from "./CardHighlight";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  data: Boardgames[];
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}
const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  maxHeight: 500,
  bgcolor: "#24263d",
  overflow: "scroll",
};

export default function SearchModal({
  open,
  handleClose,
  data,
  searchQuery,
  setSearchQuery,
}: ModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Stack sx={style}>
        <Grid container spacing={2} alignItems="center" padding={3}>
          <Grid item>
            <SearchIcon sx={{ display: "block", color: "white" }} />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Search by name"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default", color: "white" },
              }}
              variant="standard"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Grid>
        </Grid>
        <Divider sx={{ bgcolor: "gray", width: '100%' }}  />
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
            {data.length === 0 && <Typography variant="body2" color={'white'}>No item found</Typography>}
          {data.map((bg) => (
            <Grid item key={bg.id}>
              <CustomCard
                id={bg.id}
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
      </Stack>
    </Modal>
  );
}
