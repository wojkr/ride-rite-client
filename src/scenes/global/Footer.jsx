import { Typography, styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { shades } from "../../theme";
import logoImg from "../../assets/logo300x94.webp";
import logoImgMini from "../../assets/logo100.webp";
import { Link } from "react-router-dom";
import { aboutus, home } from "../../Model/menu";
import { main } from "../aboutUs/AboutUs";

const FooterLink = styled(Link)({
  display: "block",
  color: shades.primary[700],
  textDecoration: "none",
  fontSize: "",
  fontFamily: "",
});

const Footer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box marginTop="auto">
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
                your needs. We offer fast shipping and competitive pricing.
                Thank you for choosing Ride Rite for all your cycling needs!
              </Typography>
            </Box>
            {main.map((m) => (
              <Box key={m.title}>
                <FooterLink to={`${aboutus.link()}#${m.idName}`}>
                  <Typography mb="1rem" variant="h4" fontWeight="bold">
                    {m.title.toUpperCase()}
                  </Typography>
                </FooterLink>
                {m.sections.map((section) => (
                  <FooterLink
                    key={section.title}
                    to={`${aboutus.link()}#${section.idName}`}
                  >
                    <Typography mb="1rem" variant="subtitle2">
                      {section.title}
                    </Typography>
                  </FooterLink>
                ))}
              </Box>
            ))}
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
    </Box>
  );
};

export default Footer;
