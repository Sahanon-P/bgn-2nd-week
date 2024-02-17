import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
  isNew: boolean;
}
const imagePath =
  "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__original/img/FpyxH41Y6_ROoePAilPNEhXnzO8=/0x0/filters:format(jpeg)/pic3490053.jpg";
export default function BGCard({ isNew }: Props) {
  return (
    <Card>
      <CardMedia component="img" height="300" image={imagePath} />
      <CardContent sx={{ backgroundColor: "#1a1b4d" }}>
        {isNew && (
          <Box color={'white'} sx={{background:'orange'}} width={40} textAlign={'center'}>
            <Typography>New</Typography>
          </Box>
        )}
        <Typography fontWeight={"bold"} color={"white"}>
          Brass: Birmingham
        </Typography>
      </CardContent>
    </Card>
  );
}
