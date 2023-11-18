import { Box, Container, Typography } from "@mui/material";
import { shades } from "../../theme";
import { useSelector } from "react-redux";
import Order from "../../components/Order";
import { useEffect, useState } from "react";

const Orders = ({ orders = [] }) => {
  const [formattedOrders, setFormattedOrders] = useState(false);

  const items = useSelector((state) => state.cart.items);
  function populateOrders(orders) {
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
    if (orders?.length > 0) setFormattedOrders(populateOrders(orders));
  }, [items]);

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
