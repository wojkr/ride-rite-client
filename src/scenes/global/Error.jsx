import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";
import { home } from "../../Model/menu";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const isNonMobile = useMediaQuery("(min-width:1200px");
  const navigate = useNavigate();
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
        flexDirection="column"
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
            marginBottom="1rem"
          >
            something went wrong :(
          </Typography>

          <Typography>
            <Button
              variant="contained"
              onClick={() => navigate(home.link())}
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                "&:hover": { backgroundColor: shades.primary[500] },
              }}
            >
              Go to Homepage
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Error;
