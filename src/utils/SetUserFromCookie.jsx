import { useCookies } from "react-cookie";
import { cookieName } from "../Model/cookies";
import { setLoggedIn } from "../state/user";
import { serverUrl } from "../serverUrl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const SetUserFromCookie = () => {
  const [cookie] = useCookies([cookieName]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!cookie[cookieName] && cookie[cookieName] != "undefined") {
      getUser(cookie[cookieName]);
    }
  }, []);
  async function getUser(token) {
    const url = `${serverUrl}/api/users/me?populate=wishlist&populate=billingAddress&populate=shippingAddress&populate=orders`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setLoggedIn(response.data));
      })
      .catch((error) => {
        // Handle error.
        console.error("An error occurred:", error.response);
      });
  }
  return null;
};
export default SetUserFromCookie;
