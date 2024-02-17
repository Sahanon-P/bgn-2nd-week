import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
export default function Comment({username, comment}: {username:string, comment: string}) {
  return (
    <Card
      elevation={0}
      sx={{ display: "flex", padding: 2, borderRadius: "16px" }}
    >
      <CardContent sx={{ pr: 2 }}>
        <Box mb={1}>
          <Box
            component="h3"
            sx={{
              fontSize: 17,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginBottom: 0,
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {username}
          </Box>
        </Box>
        <Box
          component="p"
          sx={{ fontSize: 14, color: "grey.500", mb: "1.275rem" }}
        >
          {comment}
        </Box>
        <Divider light sx={{ mt: 1, mb: 1 }} />
      </CardContent>
    </Card>
  );
}