import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function LoadingIndicator() {
  return (
    <Box
      display={"flex"}
      height={"100%"}
      width={"100%"}
      minHeight={"10vh"}
      alignItems={"center"}
      justifyContent={"center"}
      justifyItems={"center"}
    >
      <CircularProgress disableShrink size={24} />
    </Box>
  );
}
