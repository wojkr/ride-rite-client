import { Alert, Box, Button } from "@mui/material";
import { shades } from "../../theme";
const Conformation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        you have successfully made an order - {""}
        <strong>Congrats on making your purchase</strong>
      </Alert>
      <Button
        variant="contained"
        href="/"
        sx={{
          marginTop: "1rem",
          backgroundColor: shades.primary[400],
          color: "white",
          "&:hover": { backgroundColor: shades.primary[500] },
        }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};
export default Conformation;
