export const reviewValidation = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = "Please provide a review.";
  } else if (values.text.trim() == "") {
    errors.text = "Your review cannot be empty.";
  } else if (values.text.length > 349) {
    errors.text = "Your review is too long (maximum 350 characters).";
  }

  if (!values.rating) {
    errors.rating = "Please provide a rating.";
  } else {
    const numericRating = parseInt(values.rating);
    if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
      errors.rating = "Rating must be a number between 0 and 5.";
    }
  }
  return errors;
};
