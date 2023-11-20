import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { shades } from "../../theme";
import { Box, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import {
  EmailOutlined,
  LocationOnOutlined,
  NavigationOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { products } from "../../Model/menu";

const ButtonPL0 = styled(Button)({
  paddingLeft: 0,
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: "#0000",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontWeight: "bold", fontSize: "24px" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  padding: 0,
  border: "none",
  backgroundColor: "#0000",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    border: "none",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: shades.neutral[600],
    fontSize: "100px",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  border: "none",
}));

function getGoogleMapsLink(coords) {
  const [latitude, longitude] = coords;
  const baseUrl = "https://www.google.com/maps/dir//";
  const searchCoords = `${latitude},${longitude}`;
  const currentLocation = `@${latitude},${longitude}`;
  const zoomLevel = "19z";

  return `${baseUrl}${searchCoords}/${currentLocation},${zoomLevel}`;
}

const Store = ({ store, updateMap, expanded, handleChange }) => {
  const isNonMobile = useMediaQuery("(min-width:1200px)");
  const isNonMobileXs = useMediaQuery("(min-width:800px)");
  return (
    <Box>
      <Accordion
        expanded={expanded === `panel-${store.title}`}
        onChange={handleChange(`panel-${store.title}`)}
      >
        <AccordionSummary
          aria-controls={`panel${store.title}d-content`}
          id={`panel${store.title}d-header`}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            {store.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            display="flex"
            flexDirection={
              isNonMobile ? "column" : isNonMobileXs ? "row" : "column"
            }
            justifyContent="space-around"
          >
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color={shades.neutral[800]}
              >
                {store.address.area}
              </Typography>
              <Typography variant="subtitle2" color={shades.neutral[800]}>
                {store.address.street}
                <br />
                {store.address.city}
                <br />
                {store.address.postCode}
              </Typography>
              <Box my={"10px"}>
                <Typography fontWeight="bold">Available</Typography>
                {store.categories.map((c) => (
                  <Box key={c} display="inline" pr="6px">
                    <Link
                      component="button"
                      to={`/?${c}#${products.title}`}
                      aria-label={`${c
                        ?.replace(/([A-Z])/g, " $1")
                        ?.replace(/^./g, (str) => str.toUpperCase())}`}
                      style={{ color: shades.neutral[600] }}
                    >
                      {c
                        ?.replace(/([A-Z])/g, " $1")
                        ?.replace(/^./g, (str) => str.toUpperCase())}
                    </Link>
                  </Box>
                ))}
              </Box>
              <Box mb="10px">
                <Typography fontWeight="bold">Opening Hours</Typography>
                {store.openingTimes.map((o) => (
                  <Typography
                    key={o}
                    variant="subtitle2"
                    color={shades.neutral[800]}
                  >
                    {o}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
              gap="10px"
            >
              <ButtonPL0
                onClick={() => {
                  updateMap(store.coords);
                  window.scrollTo(0, 0);
                }}
              >
                <LocationOnOutlined />
                <Typography>show on the map</Typography>
              </ButtonPL0>
              <ButtonPL0
                onClick={() => {
                  window.location.href = `tel:${store.phoneNumber.replace(
                    /[\s()-]/g,
                    ""
                  )}`;
                }}
              >
                <PhoneOutlined />
                <Typography>{store.phoneNumber}</Typography>
              </ButtonPL0>
              <ButtonPL0
                onClick={() => {
                  window.location.href = `mailto:${store.email}`;
                }}
              >
                <EmailOutlined />
                {store.email}
              </ButtonPL0>
              <ButtonPL0
                onClick={() => {
                  window.open(getGoogleMapsLink(store.coords), "_blank");
                }}
              >
                <NavigationOutlined />
                <Typography>Navigate</Typography>
              </ButtonPL0>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Store;
