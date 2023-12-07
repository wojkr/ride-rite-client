import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { shades, theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import { ourstores } from "../../Model/menu";

const About = () => {
  const isNonMobile = useMediaQuery("(min-width:1200px");
  const navigate = useNavigate();
  return (
    <Box
      id="About"
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
        gap={isNonMobile ? "5rem" : "1rem"}
      >
        <Box
          flex="5"
          paddingLeft={isNonMobile && "10%"}
          width={isNonMobile ? "80%" : "100%"}
        >
          <Typography variant="h3" color={shades.neutral[600]}>
            Welcome to
          </Typography>
          <Typography
            variant="h1"
            fontSize="88px"
            lineHeight="80%"
            fontWeight="bold"
            sx={{
              background: `linear-gradient(8deg, ${
                shades.neutral[600] + "AA"
              } 30%, ${shades.neutral[700]} 90%)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Ride Rite
          </Typography>
          <Typography fontSize="20px" color={shades.neutral[600]}>
            {" "}
            your go-to for top-notch bikes and gear!
          </Typography>
        </Box>
        <Box flex="7">
          <Typography
            lineHeight="205%"
            fontSize="18px"
            color={shades.primary[600]}
          >
            Explore bikes, gear, and accessories at Ride Rite! Top-quality
            products, friendly service, and fast shipping. Your go-to for all
            things cycling!
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              aria-label="our stores link"
              onClick={() => navigate(ourstores.link())}
              sx={{
                marginTop: "2rem",
                mb: "1rem",
                backgroundColor: shades.neutral[600],
                color: "white",
                "&:hover": {
                  backgroundColor: shades.neutral[400],
                  color: "black",
                },
              }}
            >
              Check out our stores!
            </Button>
            <Typography
              fontFamily={theme.typography.h1.fontFamily}
              color={shades.neutral[600]}
            >
              Explore Nearby Stores! 🌍 Navigate our interactive map and
              discover our stores.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ background: shades.neutral[300] }} />
    </Box>
  );
};

export default About;
