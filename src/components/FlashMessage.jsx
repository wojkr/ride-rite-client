import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const getParams = (queryString) => {
  const params = new URLSearchParams(queryString);
  const severity = params.get("severity");
  const message = params.get("message")
    ? decodeURIComponent(params.get("message"))
    : false;

  return { severity, message };
};

const FlashMessage = () => {
  const location = useLocation();
  const [message, setMessage] = useState(getParams(location.search).message);
  const [severity, setSeverity] = useState(getParams(location.search).severity);
  const [showFlash, setShowFlash] = useState(message && severity);

  useEffect(() => {
    const { message, severity } = getParams(location.search);
    setShowFlash(message && severity);
  }, [location.search]);
  return (
    <>
      {showFlash && message && severity && (
        <Alert
          severity={severity}
          onClose={() => {
            window.location.href = window.location.href.replace(
              location.search,
              ""
            );
            setShowFlash(false);
          }}
        >
          {message}
        </Alert>
      )}
    </>
  );
};
export default FlashMessage;
