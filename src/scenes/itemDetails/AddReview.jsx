import {
  Alert,
  Box,
  Button,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import LoaderStyled from "../../components/LoaderStyled";
import { shades } from "../../theme";
import PropTypes from "prop-types";
import { serverUrl } from "../../serverUrl";
import { styled } from "@mui/material/styles";
import { reviewValidation } from "../../utils/reviewValidation";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import axios from "axios";
import { cookieName } from "../../Model/cookies";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { addReviewToItems } from "../../state/cart";
import MUiAlert from "../../Model/MUiAlert";
import { spinningUpError } from "../../Model/error";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));
const iconSize = "40px";
export const customIcons = {
  1: {
    icon: (
      <SentimentVeryDissatisfiedIcon
        color="error"
        sx={{ fontSize: iconSize }}
      />
    ),
    label: "Very Dissatisfied",
  },
  2: {
    icon: (
      <SentimentDissatisfiedIcon color="error" sx={{ fontSize: iconSize }} />
    ),
    label: "Dissatisfied",
  },
  3: {
    icon: (
      <SentimentSatisfiedIcon color="warning" sx={{ fontSize: iconSize }} />
    ),
    label: "Neutral",
  },
  4: {
    icon: (
      <SentimentSatisfiedAltIcon color="success" sx={{ fontSize: iconSize }} />
    ),
    label: "Satisfied",
  },
  5: {
    icon: (
      <SentimentVerySatisfiedIcon color="success" sx={{ fontSize: iconSize }} />
    ),
    label: "Very Satisfied",
  },
};
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const AddReview = ({ itemId }) => {
  const [cookie] = useCookies([cookieName]);
  const token = cookie[cookieName];

  const [ratingInput, setRatingInput] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errorColor = "rgb(211, 47, 47)";
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [showFlash, setShowFlash] = useState(false);

  const handleFormSubmit = async (values, resetForm) => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const itemInt = parseInt(itemId);
    const { text, rating } = values;
    if (!text || !rating || isNaN(itemInt)) return;

    const url = `${serverUrl}/api/reviews/`;
    axios
      .post(
        url,
        {
          text,
          rating,
          itemId: itemInt,
        },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(addReviewToItems(response.data));

        setRatingInput(0);
        resetForm();

        setSeverity(MUiAlert.success);
        setMessage("successfully added Review.");
        setShowFlash(true);
      })
      .catch((error) => {
        //server spins up
        if (error.code == "ERR_NETWORK") {
          setSeverity(MUiAlert.warning);
          setMessage(`${spinningUpError.title} ${spinningUpError.message}`);
        } else {
          //other error
          setSeverity(MUiAlert.error);
          setMessage(
            `${error?.response?.data?.error?.message || defaultError.message}`
          );
          setShowFlash(true);
        }
      })
      .finally(() => setIsSubmitted(false));
  };
  const initialValues = {
    text: "",
    rating: "",
  };
  return (
    <Box>
      {showFlash && (
        <Alert
          severity={severity}
          sx={{ mt: "20px" }}
          onClose={() => setShowFlash(false)}
        >
          {message}
        </Alert>
      )}
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validate={(values) => reviewValidation(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box mt="20px">
              <TextField
                disabled={isSubmitted}
                fullWidth
                type="text"
                label="Review"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.text}
                name="text"
                error={!!touched.text && !!errors.text}
                helperText={touched.text && errors.text}
                sx={{ gridColumn: "span 4", marginBottom: "15px" }}
                multiline
                maxRows={5}
              />
              <Box
                border={`solid transparent 1px`}
                borderColor={
                  (ratingInput < 1 || ratingInput > 5) &&
                  !!touched.rating &&
                  !!errors.rating
                    ? errorColor
                    : "transparent"
                }
                borderRadius="4px"
                width="min-content"
                p="0.3rem"
                pb="0rem"
              >
                <StyledRating
                  name="simple-controlled"
                  label="Rating"
                  onBlur={handleBlur}
                  IconContainerComponent={IconContainer}
                  value={ratingInput}
                  onChange={(event, newValue) => {
                    newValue = newValue || 0;
                    setRatingInput(newValue);
                    values.rating = newValue;
                  }}
                  getLabelText={(value) => customIcons[value].label}
                  highlightSelectedOnly
                />
              </Box>
              {!!touched.rating &&
                !!errors.rating &&
                (ratingInput < 1 || ratingInput > 5) && (
                  <Typography
                    mt="3px"
                    mx="14px"
                    fontSize="12px"
                    color={errorColor}
                  >
                    {errors.rating}
                  </Typography>
                )}
            </Box>
            <TextField
              type="hidden"
              onChange={handleChange}
              onBlur={handleBlur}
              value={ratingInput}
              name="rating"
              sx={{
                "& *": {
                  border: "none",
                },
              }}
            />
            {!isSubmitted ? (
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: shades.primary[500],
                  boxShadow: "none",
                  textShadow: "none",
                  color: "white",
                  borderRadius: 0,
                  padding: "20px 40px",
                  m: "20px 0",
                  "&:hover": {
                    backgroundColor: shades.secondary[500],
                    color: shades.primary[800],
                  },
                }}
              >
                Submit Your Review
              </Button>
            ) : (
              <LoaderStyled noMargin={true} size="55px" />
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddReview;
