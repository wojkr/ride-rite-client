import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";
import { home } from "../../Model/menu";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { defaultError } from "../../Model/error";
import ButtonHome from "../../components/ButtonHome";

const getParams = (queryString) => {
  const params = new URLSearchParams(queryString);
  const statusCode = params.get("statusCode");
  const message = params.get("message")
    ? decodeURIComponent(params.get("message"))
    : false;
  const title = params.get("title")
    ? decodeURIComponent(params.get("title"))
    : false;
  const error = {
    statusCode,
    title,
    message,
  };
  for (const [key, value] of Object.entries(error)) {
    if (value == "undefined") error[key] = null;
  }
  return error;
};

const Error = () => {
  const isNonMobile = useMediaQuery("(min-width:1200px");
  const navigate = useNavigate();

  const location = useLocation();
  const [message, setMessage] = useState(getParams(location.search).message);
  const [title, setTitle] = useState(getParams(location.search).title);
  const [statusCode, setStatusCode] = useState(
    getParams(location.search).statusCode
  );

  useEffect(() => {
    const { message, title, statusCode } = getParams(location.search);
    setMessage(message);
    setStatusCode(statusCode);
    setTitle(title);
  }, [location.search]);

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
        padding="60px 0"
        margin="0 auto"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="baseline"
        gap={isNonMobile ? "5rem" : "1rem"}
      >
        <Box flex="5" paddingLeft={isNonMobile && "10%"} width="80%">
          <Typography
            variant="h1"
            // fontWeight="bold"
            fontSize="140px"
            lineHeight="100%"
            color={shades.neutral[600]}
          >
            {statusCode || defaultError.statusCode}
          </Typography>
          <Typography
            variant="h2"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            {title || defaultError.title}
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
            marginBottom="1rem"
          >
            {message || defaultError.message}
          </Typography>

          <Typography>
            <ButtonHome />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Error;
