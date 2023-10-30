import { Typography, useTheme, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { shades } from "../../theme";
import logoImg from "../../assets/logo300x94.webp";
import logoImgMini from "../../assets/logo100.webp";
import { Link } from "react-router-dom";
import { home } from "../../Model/menu";

const Footer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <footer>
      <Box
        width="100%"
        padding="80px 0 20px 0"
        mt="0"
        backgroundColor={shades.neutral[200]}
      >
        <Box
          width="80%"
          margin="0 auto"
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap="20px"
        >
          <Box width="clamp(30%,40%,50%)">
            <Box
              sx={{
                "&:hover": { cursor: "pointer" },
              }}
              mb="1rem"
            >
              <Link to={home.link()}>
                <img
                  src={isNonMobile ? logoImg : logoImgMini}
                  alt="ride rite logo"
                  height="30px"
                />
              </Link>
            </Box>
            <Typography mb="1rem" variant="subtitle2" lineHeight="200%">
              Our experienced team is dedicated to providing exceptional
              customer service, helping you find the perfect bike and gear for
              your needs. We offer fast shipping and competitive pricing. Thank
              you for choosing Ride Rite for all your cycling needs!
            </Typography>
          </Box>
          <Box>
            <Typography mb="1rem" variant="h4" fontWeight="bold">
              ABOUT US
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              Careers
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              Our Stores
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              T&C
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              Privacy Policy
            </Typography>
          </Box>
          <Box>
            <Typography mb="1rem" variant="h4" fontWeight="bold">
              CUSTOMER CARE
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              Help Center
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              Track Your Order
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              Corporate & Bulk Purchasing
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              Returns & Refunds
            </Typography>
          </Box>
          <Box>
            <Typography mb="1rem" variant="h4" fontWeight="bold">
              CONTACT US
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              123 Main Street <br />
              London
              <br /> W1B 2HQ
              <br /> United Kingdom
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              Email: riderite@riderite.com
            </Typography>
            <Typography mb="1rem" variant="subtitle2">
              (+44) 7712 345678
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
