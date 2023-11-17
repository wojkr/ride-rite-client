import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import React from "react";
import { shades } from "../../theme";
import LoaderStyled from "../../components/LoaderStyled";

const Loader = ({ showServerInfo, noMargin = false }) => {
  const isNonMobileXs = useMediaQuery("(min-width:400px");
  return (
    <Box width={isNonMobileXs ? "80%" : "95%"} margin={"80px auto"}>
      <LoaderStyled noMargin />
      {showServerInfo && (
        <>
          <Typography
            variant="h3"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
            marginBottom="1rem"
          >
            Server may be spinning up...
          </Typography>
          <Typography display="inline">
            This website is hosted on free tier platform. When server wasnt used
            recently - it spins down. If you entered and server wasnt spun up,
            please wait. Usually it is no longer then 30seconds.{" "}
          </Typography>
          <Typography
            display="inline"
            fontWeight="bold"
            color={shades.neutral[600]}
          >
            Thanks for patience.
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Loader;
