import { Box, Typography, Divider, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { shades } from "../../theme";
const Error = () => {
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
        padding="120px 0"
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
            404
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            something went wrong :(
          </Typography>
        </Box>
        <Typography>
          <Link to="/"> Go to Homepage</Link>
        </Typography>
      </Box>
    </Box>
  );
};
export default Error;
