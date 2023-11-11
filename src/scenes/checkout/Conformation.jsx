import { Alert, Box, Button } from "@mui/material";
import { shades } from "../../theme";
import { home } from "../../Model/menu";
import { useNavigate } from "react-router-dom";
const Conformation = () => {
  const navigate = useNavigate();
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        you have successfully made an order - {""}
        <strong>Congrats on making your purchase</strong>
      </Alert>
      <Button
        variant="contained"
        onClick={() => navigate(home.link())}
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
