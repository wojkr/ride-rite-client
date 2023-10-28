import { Box, Typography, useMediaQuery, Button } from "@mui/material";
import { useState } from "react";
import { shades } from "../../theme";
import { user } from "../../model/menu";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1200px");
  return (
    <Box
      id="User"
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
            Hello User!
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            {" "}
            Are you ready to get a new bicycle?
          </Typography>

          <Button
            variant="contained"
            // href={user.register.link()}
            onClick={() => navigate(user.login.link())}
            sx={{
              marginTop: "1rem",
              backgroundColor: shades.secondary[400],
              color: "black",
              "&:hover": { backgroundColor: shades.secondary[300] },
            }}
          >
            Yes! I have an account
          </Button>
          <Button
            variant="contained"
            // href={user.register.link()}
            onClick={() => navigate(user.register.link())}
            sx={{
              display: "block",
              marginTop: "1rem",
              backgroundColor: shades.neutral[600],
              color: "white",
              "&:hover": { backgroundColor: shades.neutral[700] },
            }}
          >
            I do not have an account
          </Button>
        </Box>
        <Box flex="7">
          <Typography color={shades.neutral[800]} lineHeight="225%">
            User details, Login btn or register
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
