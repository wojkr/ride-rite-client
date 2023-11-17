import {
  Box,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import {
  Remove as RemoveIcon,
  Add as AddIcon,
  ShoppingBagOutlined as BagIcon,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Item from "../../components/Item";

import { addToCart } from "../../state/cart";
import { shades } from "../../theme";
import { serverUrl } from "../../serverUrl";
import { products } from "../../Model/menu";
import Nav from "./Nav";
import fetchFromServer, { createQuery } from "../../utils/fetchFromServer";
import Loader from "../global/Loader";

const ItemDetails = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1400px");
  const isNonMobileXs = useMediaQuery("(min-width:400px");

  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState(null);
  const [lastItemId, setLastItemId] = useState(0);

  const [randomId, setRandomId] = useState(
    Math.floor(Math.random() * (20 - 4))
  );

  const getItem = async () => {
    const item = await fetchFromServer(
      `${serverUrl}/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    if (item?.error) {
      console.log(item);
      navigate(
        `/error${createQuery(
          item.error.statusCode,
          item.error.title,
          item.error.message
        )}`
      );
    } else {
      setItem(item.data);
    }
  };
  const getItems = async () => {
    const itemsJson = await fetchFromServer(
      `${serverUrl}/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    if (itemsJson?.error) {
      navigate(
        `/error${createQuery(
          itemsJson.error.statusCode,
          itemsJson.error.title,
          itemsJson.error.message
        )}`
      );
    } else {
      setItems(itemsJson.data);
      setLastItemId(itemsJson.data[itemsJson.data?.length - 1].id);
    }
  };
  const setInitialStates = () => {
    setCount(1);
    setValue("description");
  };

  useEffect(() => {
    getItem();
    getItems();
    setRandomId((prev) => (prev + 1) % 16);
    setInitialStates();
  }, [itemId]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        id="ItemDetails"
        style={{
          background: `linear-gradient(0deg, ${shades.neutral[100] + "00"}, ${
            shades.neutral[100]
          })`,
        }}
      >
        {item ? (
          <Box width={isNonMobileXs ? "80%" : "95%"} margin="80px auto">
            {/* NAVIGATION */}
            <Nav itemId={itemId} lastItemId={lastItemId} />
            <Box
              display="flex"
              justifyContent="center"
              flexWrap={isNonMobile ? "" : "wrap"}
              columnGap="40px"
            >
              {/* IMAGE */}
              <Box mb="40px">
                <img
                  src={
                    item?.attributes
                      ? `${serverUrl}${item?.attributes.image?.data?.attributes?.formats?.medium?.url}`
                      : ""
                  }
                  alt={item?.name}
                  style={{
                    minHeight: "400px",
                    minWidth: "300px",
                    width: isNonMobile ? "" : "100%",
                    backgroundColor: shades.neutral[200],
                  }}
                />
              </Box>
              {/* TEXT */}
              <Box mb="40px">
                {/* TITLE AND DESCRIPTION */}
                <Box mb="25px">
                  <Typography variant="h3">{item?.attributes?.name}</Typography>
                  <Typography>£{item?.attributes?.price}</Typography>
                  <Typography variant="subtitle1" mt="20px">
                    {item?.attributes?.shortDescription}
                  </Typography>
                </Box>
                {/* COUNT AND ADD TO CART BTN */}
                <Box display="flex" alignItems="center" minHeight="50px">
                  <Box
                    display="flex"
                    alignItems="center"
                    border={`1.5px solid ${shades.neutral[200]}`}
                    mr="20px"
                    p="2px 5px"
                  >
                    <IconButton
                      onClick={() => setCount(Math.max(count - 1, 1))}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography
                      color={shades.primary[400]}
                      width="1rem"
                      textAlign="center"
                    >
                      {count}
                    </Typography>
                    <IconButton onClick={() => setCount(count + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {/* BUTTON */}
                  <Button
                    onClick={() => {
                      dispatch(addToCart({ item: { ...item, count } }));
                      setCount(1);
                    }}
                    sx={{
                      borderRadius: 0,
                      minWidth: "150px",
                      padding: "10px 40px",
                      marginLeft: "10px",
                      backgroundColor: shades.primary[400],
                      color: "white",
                      "&:hover": { backgroundColor: shades.primary[500] },
                    }}
                  >
                    {" "}
                    Add to Cart <BagIcon />
                  </Button>
                </Box>
                {/* HEART ICON AND CATEGORY */}
                <Box>
                  <Box m="20px 0 5px 0" display="flex">
                    <FavoriteBorderOutlined />
                    <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                  </Box>
                  {item?.attributes?.category && (
                    <Typography>
                      CATEGORIES:{" "}
                      <Link
                        to={`/?${item?.attributes?.category}#${products.linkText}`}
                      >
                        {item?.attributes?.category
                          ?.replace(/([A-Z])/g, " $1")
                          ?.replace(/^./g, (str) => str.toUpperCase())}
                      </Link>
                    </Typography>
                  )}
                </Box>

                {/* TABS */}
                <Box m="20px 0">
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" />
                    <Tab label="REVIEWS" value="reviews" />
                  </Tabs>
                </Box>
                <Box display="flex" flexWrap="wrap" gap="15px">
                  {value === "description" && (
                    <div>{item?.attributes?.longDescription}</div>
                  )}
                  {value === "reviews" && <div>reviews</div>}
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Loader />
        )}
        {/* RELATED ITEMS */}
        {items ? (
          <Box width={isNonMobileXs ? "80%" : "95%"} margin="80px auto">
            <Typography variant="h3" fontWeight="bold">
              Related Products
            </Typography>
            <Box
              mt="20px"
              display="flex"
              flexWrap="wrap"
              columnGap="1.33%"
              justifyContent="space-between"
            >
              {items.slice(randomId, randomId + 4).map((item, i) => (
                <Item key={`${Math.random()}=${item.name}-${i}`} item={item} />
              ))}
            </Box>
          </Box>
        ) : (
          <Loader />
        )}
      </Box>
    </>
  );
};
export default ItemDetails;
