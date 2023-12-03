import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ItemsContainer from "../../components/ItemsContainer";
import { useSelector } from "react-redux";
import Item from "../../components/Item";
import { shades } from "../../theme";
import ButtonHome from "../../components/ButtonHome";

const Search = () => {
  const { query } = useParams();
  const tags = query.split(" ");
  const items = useSelector((state) => state.cart.items);
  const [randomId, setRandomId] = useState(
    Math.floor(Math.random() * (20 - 4))
  );
  const foundItems = items.filter(
    (item) =>
      tags.some((tag) =>
        item.attributes.name.toLowerCase().includes(tag.toLowerCase())
      ) ||
      tags.some((tag) =>
        item.attributes.shortDescription
          .toLowerCase()
          .includes(tag.toLowerCase())
      )
  );
  return (
    <Box
      id="search"
      style={{
        background: `linear-gradient(0deg, ${shades.neutral[100] + "00"}, ${
          shades.neutral[100]
        })`,
      }}
    >
      <Box width="80%" padding="80px 0" margin="0 auto">
        <Box mb="30px">
          <Typography
            variant="h2"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
            display="inline"
          >
            Search Results for:{" "}
          </Typography>
          <Typography
            display="inline"
            variant="h3"
            lineHeight="150%"
            pb="60px"
            color={shades.primary[500]}
          >
            {query}
          </Typography>
        </Box>
        {foundItems.length == 0 ? (
          <>
            <Typography
              variant="h3"
              fontWeight="bold"
              lineHeight="150%"
              color={shades.neutral[600]}
              display="inline"
            >
              No Matching Items Found... :{"("}
            </Typography>
            <Box mt="20px">
              <ButtonHome />
            </Box>
            <Box margin="80px auto">
              <Typography
                variant="h3"
                fontWeight="bold"
                color={shades.neutral[600]}
              >
                Explore Our Collection
              </Typography>
              <Box
                mt="20px"
                display="flex"
                flexWrap="wrap"
                columnGap="1.33%"
                justifyContent="space-between"
              >
                {items.slice(randomId, randomId + 4).map((item, i) => (
                  <Item
                    key={`${Math.random()}=${item.name}-${i}`}
                    item={item}
                  />
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <ItemsContainer>
            {foundItems.map((item) => (
              <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
            ))}
          </ItemsContainer>
        )}
      </Box>
    </Box>
  );
};

export default Search;
