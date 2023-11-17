import { notFound, spinningUpError } from "../Model/error";

export const createQuery = (statusCode, title, message) =>
  `?statusCode=${statusCode}&title=${title}&message=${message}`;

async function fetchFromServer(url, options) {
  //returns resJson or if error "error"
  try {
    const res = await fetch(url, options);
    if (res) {
      0;
      if (res.status >= 400 && res.status < 600) {
        if (res.status == 404) return { error: notFound };
        return {
          error: {
            statusCode: 400,
            title: "Ooops...",
            message: "Something went wrong :(",
          },
        };
      }
      const resJson = await res.json();
      return resJson;
    }
  } catch (e) {
    return { error: spinningUpError };
  }
}
export default fetchFromServer;
