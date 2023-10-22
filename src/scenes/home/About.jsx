import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { shades } from "../../theme";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const isNonMobile = useMediaQuery("(min-width:1200px");
  return (
    <Box
      style={{
        background: `linear-gradient(0deg, ${shades.neutral[100] + "00"}, ${
          shades.neutral[100]
        })`,
      }}
    >
      <Box
        width="80%"
        padding="80px 0"
        margin="0 auto"
        display="flex"
        flexDirection={isNonMobile ? "row" : "column"}
        justifyContent="space-evenly"
        alignItems="baseline"
        gap={isNonMobile ? "5rem" : "1rem"}
      >
        <Box flex="5" paddingLeft={isNonMobile && "10%"} width="80%">
          <Typography
            variant="h2"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            Welcome to Ride Rite
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            {" "}
            your online destination for high-quality bicycles and accessories.
          </Typography>
        </Box>
        <Box flex="7">
          <Typography color={shades.neutral[800]} lineHeight="225%">
            We offer a wide selection of bikes, including road bikes, mountain
            bikes, electric bikes, and hybrids, as well as a range of
            accessories such as helmets, locks, lights, and apparel. Our
            experienced team is dedicated to providing exceptional customer
            service and helping you find the perfect bike and gear to suit your
            needs. We source our products from top manufacturers to ensure the
            best quality and performance, and offer competitive pricing and fast
            shipping. Thank you for choosing Ride Rite for all your cycling
            needs!
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ background: shades.neutral[300] }} />
    </Box>
  );
};

export default Subscribe;
