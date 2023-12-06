import { serverUrl } from "../serverUrl";
import { useEffect } from "react";
import fetchFromServer from "./fetchFromServer";
import { setItems } from "../state/cart";
import { useDispatch } from "react-redux";

const GetItems = () => {
  console.log("GETITEMS");
  const dispatch = useDispatch();
  const getItems = async () => {
    const url = `${serverUrl}/api/items?populate=image&populate=reviews`;
    const itemsJson = await fetchFromServer(url, {
      method: "GET",
    });
    dispatch(setItems(itemsJson.data));
  };

  useEffect(() => {
    getItems();
  }, []);
  return null;
};
export default GetItems;
