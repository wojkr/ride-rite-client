import { MarkEmailReadOutlined as MarkEmailReadOutlinedIcon } from "@mui/icons-material";
import { Box, Divider, IconButton, InputBase, Typography } from "@mui/material";
import { useState } from "react";
import { shades } from "../../theme";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  return (
    <Box width="80%" margin="80px auto 0" textAlign="center">
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">SUBSCRIBE TO OUR NEWSLETTER</Typography>
      <Typography>
        and receive £50 coupon for your first order when you checkout
      </Typography>

      {/* MAIL SECTION */}
      <Box
        p="2px 4px"
        m="15px auto 0"
        backgroundColor={shades.neutral[200]}
        display="flex"
        alignItems="center"
        width="75%"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />

        <Typography sx={{ p: "10px", ":hover": { cursor: "pointer" } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscribe;
