import { Box, Divider, IconButton, InputBase, Typography } from "@mui/material";
import { useState } from "react";
import { shades } from "../../theme";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  return (
    <Box width="80%" margin="80px auto 0 auto" textAlign="center">
      <Typography variant="h3" fontWeight="bold" mb="1rem">
        {" "}
        Welcome to Ride Rite, your online destination for high-quality bicycles
        and accessories.
      </Typography>
      <Typography variant="subtitle1" lineHeight="250%" mb="80px">
        We offer a wide selection of bikes, including road bikes, mountain
        bikes, electric bikes, and hybrids, as well as a range of accessories
        such as helmets, locks, lights, and apparel. Our experienced team is
        dedicated to providing exceptional customer service and helping you find
        the perfect bike and gear to suit your needs. We source our products
        from top manufacturers to ensure the best quality and performance, and
        offer competitive pricing and fast shipping. Thank you for choosing Ride
        Rite for all your cycling needs!
      </Typography>
      <Divider />
    </Box>
  );
};

export default Subscribe;
