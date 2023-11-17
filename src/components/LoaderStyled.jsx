import { Box, styled } from "@mui/material";
import React from "react";
import { ClipLoader } from "react-spinners";
import { shades } from "../theme";
const CenterBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 180px;
  margin-bottom: 100px;
`;
const LoaderStyled = ({ noMargin = false, size = "100px" }) => {
  return noMargin ? (
    <CenterBox sx={{ marginY: "10px" }}>
      <ClipLoader loading={true} size={size} color={`${shades.neutral[700]}`} />
    </CenterBox>
  ) : (
    <CenterBox>
      <ClipLoader loading={true} size={size} />
    </CenterBox>
  );
};

export default LoaderStyled;
