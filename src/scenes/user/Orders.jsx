import { Box, Container, Divider, Typography } from "@mui/material";
import { shades } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import Order from "../../components/Order";
import { serverUrl } from "../../serverUrl";
import { setItems } from "../../state/cart";
import { useEffect, useState } from "react";

const Orders = ({ orders }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [formattedOrders, setFormattedOrders] = useState(false);

  const getItems = async () => {
    const items = await fetch(`${serverUrl}/api/items?populate=image`, {
      method: "GET",
    });
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  };
  //...
  function populateOrders(orders, items) {
    return orders.map((order) => {
      const matchedProducts = order.products.map((product) => {
        const matchingItem = items.find((item) => item.id === product.id);
        if (matchingItem) {
          return { ...product, ...matchingItem };
        }
        return product;
      });

      return {
        ...order,
        products: matchedProducts,
      };
    });
  }
  useEffect(() => {
    setFormattedOrders(populateOrders(orders, items));
  }, [items]);
  useEffect(() => {
    getItems();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="md">
      <Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          lineHeight="150%"
          color={shades.neutral[600]}
          marginTop="80px"
          marginBottom="20px"
        >
          Your Orders:
        </Typography>
        {formattedOrders &&
          formattedOrders.map((o, index) => (
            <Order order={o} key={`${o?.createdAt || o?.id}${index}`} />
          ))}
      </Box>
    </Container>
  );
};
export default Orders;
