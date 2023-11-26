import {
  Box,
  Tab,
  Tabs,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Item from "../../components/Item";
import { shades } from "../../theme";
import { category as categoryModel } from "../../Model/category";
import Loader from "../global/Loader";
import ItemsContainer from "../../components/ItemsContainer";

const ShoppingList = ({ categoryId }) => {
  const [value, setValue] = useState(categoryModel.check(categoryId));
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const newArrival = items?.filter(
    (i) => i.attributes.category === categoryModel.newArrival
  );
  const bestSeller = items?.filter(
    (i) => i.attributes.category === categoryModel.bestSeller
  );
  const topRated = items?.filter(
    (i) => i.attributes.category === categoryModel.topRated
  );
  return (
    <Box id="Products">
      <Box className="" width="80%" margin="0 auto" padding="80px 0">
        <Typography variant="h2" textAlign="center" color={shades.neutral[700]}>
          Our Featured <b>Products</b>
        </Typography>
        <Tabs
          textColor="primary"
          indicatorColor="secondary"
          color={shades.neutral[400]}
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            sx: { display: isNonMobile ? "block" : "none" },
          }}
          sx={{
            m: "25px",
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
        >
          <Tab label="ALL" value={categoryModel.all} />
          <Tab label="NEW ARRIVALS" value={categoryModel.newArrival} />
          <Tab label="BEST SELLERS" value={categoryModel.bestSeller} />
          <Tab label="TOP RATED" value={categoryModel.topRated} />
        </Tabs>
        {items?.length > 0 ? (
          <ItemsContainer>
            {value === "all" &&
              items.map((item) => (
                <Item
                  key={`${item.name}-${item.id}`}
                  item={item}
                  width="300px"
                />
              ))}
            {value === "newArrival" &&
              newArrival.map((item) => (
                <Item
                  key={`${item.name}-${item.id}`}
                  item={item}
                  width="300px"
                />
              ))}
            {value === "bestSeller" &&
              bestSeller.map((item) => (
                <Item
                  key={`${item.name}-${item.id}`}
                  item={item}
                  width="300px"
                />
              ))}
            {value === "topRated" &&
              topRated.map((item) => (
                <Item
                  key={`${item.name}-${item.id}`}
                  item={item}
                  width="300px"
                />
              ))}
          </ItemsContainer>
        ) : (
          <Loader showServerInfo />
        )}
      </Box>
      <Divider sx={{ background: shades.neutral[300] }} />
    </Box>
  );
};

export default ShoppingList;
