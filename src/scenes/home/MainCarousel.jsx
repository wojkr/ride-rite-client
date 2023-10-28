import { Link } from "react-router-dom";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavigateBefore, PinSharp } from "@mui/icons-material";
import { NavigateNext } from "@mui/icons-material";
import { theme, shades } from "../../theme";
import pic from "../../assets/1.jpg";
import pic2 from "../../assets/2.jpg";
import pic3 from "../../assets/3.jpg";
import pic4 from "../../assets/4.jpg";
import pic5 from "../../assets/5.jpg";
import { category } from "../../model/category";
import { products } from "../../model/menu";

const DiscoverLink = styled(Link)({
  fontFamily: theme.typography.h4.fontFamily,
  fontWeight: "bold",
  paddingRight: "1rem",
  color: shades.secondary[100],
  textDecoration: "underline",
});

const heroTextureImports = [pic, pic2, pic3, pic4, pic5];
const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");
  return (
    <Box id="Home">
      <Carousel
        swipeable={false}
        infiniteLoop={true}
        autoPlay={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <>
            {isNonMobile && (
              <IconButton
                onClick={onClickHandler}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  padding: "5px",
                  zIndex: "10",
                }}
              >
                <NavigateBefore
                  sx={{
                    fontSize: 46,
                    background: shades.neutral[100],
                    borderRadius: "100%",
                    padding: "10px",
                  }}
                />
              </IconButton>
            )}
          </>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <>
            {isNonMobile && (
              <IconButton
                onClick={onClickHandler}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  zIndex: "10",
                }}
              >
                <NavigateNext
                  sx={{
                    fontSize: 46,
                    background: shades.neutral[100],
                    borderRadius: "100%",
                    padding: "10px",
                  }}
                />
              </IconButton>
            )}
          </>
        )}
      >
        {Object.values(heroTextureImports).map((texture, index) => (
          <Box key={`carousel-image-${index}`}>
            <img
              src={texture}
              alt={`carousel-${index}`}
              style={{
                width: "100%",
                height: "700px",
                objectFit: "cover",
                backgroundAttachment: "fixed",
              }}
            />
            {/* CONTAINER FOR TEXT */}
            <Box
              padding="20px 0"
              borderRadius="1px"
              textAlign="right"
              position="absolute"
              top="45%"
              right={isNonMobile ? "10%" : "0"}
              left={isNonMobile ? undefined : "0"}
              margin={isNonMobile ? undefined : "0 auto"}
              maxWidth={isNonMobile ? undefined : "240px"}
              backgroundColor={shades.neutral[700] + "99"}
            >
              <Typography
                color="#fff"
                fontWeight="bold"
                paddingRight="1rem"
                variant="h4"
              >
                --NEW ITEMS
              </Typography>
              <Typography
                variant="h1"
                backgroundColor={shades.neutral[100] + "ff"}
                color="#000"
                sx={{ mixBlendMode: "screen" }}
                fontWeight="bold"
                padding="1rem"
                fontSize="10vw"
              >
                Summer Sale
              </Typography>
              <DiscoverLink to={`/?${category.all}#${products.linkText}`}>
                Discover More
              </DiscoverLink>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MainCarousel;
