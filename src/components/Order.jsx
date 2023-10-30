import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { shades } from "../theme";
import styled from "@emotion/styled";
import { serverUrl } from "../serverUrl";
import { useNavigate } from "react-router-dom";
import { item as itemPath } from "../Model/menu";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Order = ({ order }) => {
  const navigate = useNavigate();
  const totalPrice = order.products.reduce((total, item) => {
    return total + item?.attributes?.price * item?.count;
  }, 0);
  return (
    <Box
      marginBottom="80px"
      padding="1rem"
      sx={{ backgroundColor: shades.neutral[100] + "88" }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          lineHeight="150%"
          color={shades.neutral[600]}
          padding="1rem"
        >
          {new Date(order.createdAt).toLocaleString()}
        </Typography>
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill,250px)"
          justifyContent="space-around"
          rowGap="20px"
        >
          {order.products.map((item, index) => (
            <Box key={`${(index * 11) % 3} ${(index * 7) % 2}`}>
              {item?.attributes?.name && (
                <Box display="flex" width="min">
                  <img
                    alt={item?.name}
                    width="123px"
                    height="164px"
                    style={{
                      cursor: "pointer",
                      objectFit: "cover",
                      backgroundColor: shades.neutral[200],
                    }}
                    src={`${serverUrl}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    onClick={() => navigate(`${itemPath}/${item.id}`)}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    padding="1rem"
                    paddingTop="0"
                  >
                    <Typography fontWeight="bold">
                      {item?.attributes.name}
                    </Typography>
                    <Typography marginBottom="1rem">
                      Count: {item?.count}
                    </Typography>
                    <Typography fontWeight="bold">
                      £{item?.attributes?.price}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
        <Divider sx={{ background: shades.neutral[100], marginTop: "1rem" }} />
        <Typography fontWeight="bold" textAlign="right" padding="1rem">
          total: £{totalPrice}
        </Typography>
      </Box>
    </Box>
  );
};

export default Order;
