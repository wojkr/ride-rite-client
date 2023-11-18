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
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Item from "../../components/Item";

import { addToCart, setItems } from "../../state/cart";
import { shades } from "../../theme";
import { serverUrl } from "../../serverUrl";
import { products, user } from "../../Model/menu";
import Nav from "./Nav";
import fetchFromServer, { createQuery } from "../../utils/fetchFromServer";
import Loader from "../global/Loader";
import ButtonWishlist from "../../components/ButtonWishlist";

const ItemDetails = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1400px");
  const isNonMobileXs = useMediaQuery("(min-width:400px");

  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const items = useSelector((state) => state.cart.items);
  const [lastItemId, setLastItemId] = useState(0);

  const [randomId, setRandomId] = useState(
    Math.floor(Math.random() * (20 - 4))
  );

  const getItem = async () => {
    const url = `${serverUrl}/api/items/${itemId}?populate=image`;
    const item = await fetchFromServer(url, {
      method: "GET",
    });
    if (item?.error) {
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
    const url = `${serverUrl}/api/items?populate=image`;
    const itemsJson = await fetchFromServer(url, {
      method: "GET",
    });
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
    if (items.length < 1) {
      getItem();
      getItems();
    } else {
      setItem(items.find((i) => `${i.id}` == itemId));
    }
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
                  {item?.attributes?.category && (
                    <Typography color={shades.primary[400]}>
                      CATEGORIES:{" "}
                      <Link
                        component="button"
                        to={`/?${item?.attributes?.category}#${products.linkText}`}
                        aria-label="go to item's category"
                        style={{ color: shades.neutral[600] }}
                      >
                        {item?.attributes?.category
                          ?.replace(/([A-Z])/g, " $1")
                          ?.replace(/^./g, (str) => str.toUpperCase())}
                      </Link>
                    </Typography>
                  )}
                  <Typography variant="h3">
                    {item?.attributes?.name}{" "}
                    {isLoggedIn && (
                      <ButtonWishlist isFavorite={user?.wishlist} />
                    )}
                  </Typography>
                  <Typography fontWeight="bold">
                    £{item?.attributes?.price}
                  </Typography>
                  <Typography variant="subtitle1" mt="10px">
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
            <Typography
              variant="h3"
              fontWeight="bold"
              color={shades.neutral[600]}
            >
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
