import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/Item";
import { setItems } from "../../state";
import { serverUrl } from "../../serverUrl";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const getItems = async () => {
    const items = await fetch(`${serverUrl}/api/items?populate=image`, {
      method: "GET",
    });
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  };

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  const newArrival = items.filter(
    (i) => i.attributes.category === "newArrival"
  );
  const bestSeller = items.filter(
    (i) => i.attributes.category === "bestSeller"
  );
  const topRated = items.filter((i) => i.attributes.category === "topRated");
  return (
    <Box className="" width="80%" margin="80px auto">
      <Typography variant="h2" textAlign="center">
        Our Feaetured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrival" />
        <Tab label="BEST SELLERS" value="bestSeller" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill,300px)"
        justifyContent="space-around"
        rowGap="20px"
      >
        {value === "all" &&
          items.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
          ))}
        {value === "newArrival" &&
          newArrival.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
          ))}
        {value === "bestSeller" &&
          bestSeller.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
          ))}
        {value === "topRated" &&
          topRated.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
