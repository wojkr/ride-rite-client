import { Box, Typography } from "@mui/material";
import React from "react";
import { shades } from "../../theme";
import { useSelector } from "react-redux";
import Review from "./Review";
import ButtonLogin from "../../components/ButtonLogin";
import ButtonRegister from "../../components/ButtonRegister";
import AddReview from "./AddReview";

const Reviews = ({ reviews, itemId }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {user?.id ? (
        // USER LOGGED
        <AddReview itemId={itemId} />
      ) : (
        //PUBLIC
        <>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={shades.primary[400]}
          >
            Log in to Share Your Review
          </Typography>
          <Box display="flex" gap="30px" flexWrap="wrap" mb="30px">
            <ButtonLogin />
            <ButtonRegister />
          </Box>
        </>
      )}
      {reviews?.length > 0 ? (
        reviews.map((review) => (
          <Review key={`review-${review?.id}`} review={review} />
        ))
      ) : (
        <Box sx={{ background: shades.neutral[200], py: "30px" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={shades.primary[400]}
            textAlign="center"
          >
            This product hasn't been reviewed yet
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Reviews;
