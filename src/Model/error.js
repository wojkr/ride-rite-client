const spinningUpError = {
  statusCode: 200,
  title: "Please wait...",
  message: "Server is spinnig up, it will be ready in a minute :)",
};
const notFound = {
  statusCode: 404,
  title: "Page not found",
  message: "The server could not find what was requested :(",
};

const defaultError = {
  statusCode: 404,
  title: "Oooops... Page not found",
  message: "Something went wrong :(",
};
export { notFound, spinningUpError, defaultError };
