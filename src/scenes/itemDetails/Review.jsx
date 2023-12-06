import { Box, Icon, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { shades } from "../../theme";
import { customIcons } from "./AddReview";

const Review = ({ review }) => {
  const isNonMobile = useMediaQuery(`(min-width:600px)`);

  return (
    <Box
      mt="20px"
      p="1rem"
      sx={{ backgroundColor: shades.neutral[100] + "88" }}
    >
      <Box>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="end"
          justifyContent="space-between"
        >
          <Typography
            variant="subtitle1"
            lineHeight="150%"
            color={shades.neutral[600]}
            pt="1rem"
            pr={!isNonMobile && "70px"}
          >
            {new Date(review.attributes.createdAt).toLocaleString()}
          </Typography>
          <Icon
            sx={{ width: "auto", height: "auto", mb: "-9px" }}
            aria-hidden="false"
            aria-label={customIcons[review.attributes.rating].label}
            component="label"
            role="contentinfo"
            title={customIcons[review.attributes.rating].label}
          >
            {customIcons[review.attributes.rating].icon}
          </Icon>
        </Box>
        <Typography pt="0.5rem">{review.attributes.text}</Typography>
      </Box>
    </Box>
  );
};

export default Review;
