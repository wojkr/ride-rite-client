import { useTheme } from "@emotion/react";
import {
  Add as AddIcon,
  AspectRatio,
  Remove as RemoveIcon,
  ShoppingBagOutlined as BagIcon,
} from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../state";
import { shades } from "../theme";
import { serverUrl } from "../serverUrl";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box width={width}>
      <Box
        position="relative"
        backgroundColor={shades.neutral[100] + "F0"}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        height="400px"
      >
        <img
          src={`${serverUrl}${url}`}
          alt={name}
          width="300px"
          height="400px"
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer", objectFit: "contain" }}
        />

        {/* INCREASE DECRASE AMOUNT */}
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[200]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[400]}>{count}</Typography>
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
                backgroundColor: shades.primary[400],
                color: "white",
                "&:hover": { backgroundColor: shades.primary[500] },
              }}
            >
              {" "}
              Add to Cart <BagIcon />
            </Button>
          </Box>
        </Box>
      </Box>
      {/* INFO */}
      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            ?.replace(/([A-Z])/g, " $1")
            ?.replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">£{price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
