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
    await axios
      .get(
        `${serverUrl}/api/users/me?populate=billingAddress&populate=shippingAddress&populate=orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(setLoggedIn(response.data));
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  }
  return null;
};
export default SetUserFromCookie;
