import React, { useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { category } from "../../Model/category";
import { shades } from "../../theme";
import Store from "./Store";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});
const stores = [
  {
    title: "London",
    categories: [category.bestSeller, category.newArrival, category.topRated],
    openingTimes: ["Mon - Sat 10:00 - 21:00", "Sun 12:00 - 18:00"],
    address: {
      area: "East Marylebone",
      street: "123 Main Street",
      city: "London",
      postCode: "W1B 2HQ",
    },
    email: `London@riderite.com`,
    phoneNumber: "(+44) 7712 345678",
    coords: [51.5161149, -0.1426303],
  },
  {
    title: "Manchester",
    categories: [category.bestSeller, category.topRated],
    openingTimes: ["Mon - Fri 9:00 - 21:00", "Sat 12:00 - 18:00"],
    address: {
      area: "City Center",
      street: "12 High Street",
      city: "Manchester",
      postCode: "M2 1BB",
    },
    email: `Manchester@riderite.com`,
    phoneNumber: "(+44) 7787 654321",
    coords: [53.4817254, -2.2416601],
  },
];

const OurStores = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const isNonMobile = useMediaQuery("(min-width:1200px");
  const initialCenter = [54.1811472, -4.7819689];
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  function SetViewOnClick() {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });
    return null;
  }

  function updateMap(coord = false) {
    mapRef?.current.flyTo(coord || initialCenter, coord ? 18 : 5, {
      animate: true,
    });
  }

  return (
    <Box
      id="About"
      style={{
        background: `linear-gradient(0deg, ${shades.neutral[100] + "00"}, ${
          shades.neutral[100]
        })`,
      }}
    >
      <Box width="80%" padding="80px 0" margin="0 auto">
        <Typography
          variant="h2"
          fontWeight="bold"
          lineHeight="150%"
          color={shades.neutral[600]}
        >
          Our Stores
        </Typography>
        <Box
          display="flex"
          flexDirection={isNonMobile ? "row" : "column-reverse"}
          justifyContent="space-evenly"
          gap={isNonMobile ? "5rem" : "1rem"}
        >
          <Box flex="4">
            {stores.map((store) => {
              return (
                <Store
                  key={store.title}
                  store={store}
                  updateMap={updateMap}
                  expanded={expanded}
                  handleChange={handleChange}
                />
              );
            })}
          </Box>
          <Box flex="8" zIndex={10}>
            <MapContainer
              style={{ height: "35dvh" }}
              center={initialCenter}
              zoom={5}
              scrollWheelZoom={true}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <SetViewOnClick />
              {stores.map((store) => (
                <Marker
                  key={store.title + "" + store.address.postCode}
                  position={store.coords}
                />
              ))}
            </MapContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OurStores;
