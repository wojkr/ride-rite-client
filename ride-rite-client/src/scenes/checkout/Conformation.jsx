import { Alert, AlertTitle, Box } from "@mui/material";

const Conformation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        you have successfully made an order - {""}
        <strong>Congrats on making your purchase</strong>
      </Alert>
    </Box>
  );
};
export default Conformation;
