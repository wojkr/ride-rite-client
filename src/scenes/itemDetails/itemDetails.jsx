import {
  Box,
  Typography,
  Button,
  useTheme,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Remove as RemoveIcon,
  Add as AddIcon,
  ShoppingBagOutlined as BagIcon,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Item from "../../components/Item";

import { addToCart } from "../../state/cart";
import { shades } from "../../theme";
import { serverUrl } from "../../serverUrl";

const ItemDetails = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [lastItemId, setLastItemId] = useState(0);

  const [randomId, setRandomId] = useState(
    Math.floor(Math.random() * (20 - 4))
  );

  const getItem = async () => {
    const item = await fetch(
      `${serverUrl}/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  };
  const getItems = async () => {
    const items = await fetch(`${serverUrl}/api/items?populate=image`, {
      method: "GET",
    });
    const itemsJson = await items.json();
    setLastItemId(itemsJson.data[itemsJson.data?.length - 1].id);
    setItems(itemsJson.data);
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
    <Box width="80%" margin="80px auto">
      <Box
        display="flex"
        justifyContent="center"
        // flexWrap="wrap"
        columnGap="40px"
      >
        {/* IMAGE */}
        <Box
          flex="1 1 40%"
          mb="40px"
          // maxWidth="500px"
        >
          <img
            src={`${serverUrl}${item?.attributes.image?.data?.attributes?.formats?.medium?.url}`}
            alt={item?.name}
            width="100%"
            height="100%"
            // maxWidth="500px"
            style={{
              objectFit: "contain",
              backgroundColor: shades.neutral[200],
            }}
          />
        </Box>
        {/* TEXT */}
        <Box flec="1 1 50%" mb="40px">
          {/* NAVIGATION */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              <Link to="/">Home</Link>
              /Item
            </Typography>
            <Box>
              {itemId > 1 && (
                <Button onClick={() => navigate(`/item/${Number(itemId) - 1}`)}>
                  Prev
                </Button>
              )}
              {itemId != lastItemId && (
                <Button onClick={() => navigate(`/item/${Number(itemId) + 1}`)}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
          {/* TITLE AND DESCRIPTION */}
          <Box m="65px 0 25px 0">
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
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
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
                <Link to={`/?${item?.attributes?.category}`}>
                  {item?.attributes?.category
                    ?.replace(/([A-Z])/g, " $1")
                    ?.replace(/^./g, (str) => str.toUpperCase())}
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
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

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
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
    </Box>
  );
};
export default ItemDetails;
