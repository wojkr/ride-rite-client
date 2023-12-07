import React, { useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { shades } from "../../theme";
import Section from "./Section";
import { useLocation } from "react-router-dom";

const companyName = "Ride Rite";
const mailAddress = "riderite@riderite.com";
const customerCare = {
  title: "Customer Care",
  idName: "Customercare",
  sections: [
    {
      title: "Help Center",
      idName: "Help",
      text: `Welcome to our Help Center, where we aim to provide you with comprehensive support and answers to common questions. Browse through our collection of guides, FAQs, and troubleshooting tips to find the assistance you need. If you can't find the information you're looking for, don't hesitate to reach out to our customer support team at ${mailAddress}. Your satisfaction is our top priority, and we're here to help you every step of the way.`,
    },
    {
      title: "Track Your Order",
      idName: "Track",
      text: `Keep tabs on your order effortlessly with our user-friendly order tracking system. Simply provide your order details, and voila! Instantly receive updates on the current status and location of your shipment. If you have any questions or need further assistance regarding your order, our dedicated customer support team is here to help. Feel free to reach out to us at ${mailAddress}, and we'll ensure you're in the know every step of the way.`,
    },
    {
      title: "Corporate & Bulk Purchasing",
      idName: "Bulk",
      text: `For corporate and bulk purchasing needs, we offer tailored solutions to meet your business requirements. Explore the benefits of partnering with ${companyName} for your organization's needs. Our dedicated ${companyName} sales team is available to guide you through the process, offering personalized assistance and special pricing options. Connect with us at ${mailAddress} to discuss how we can help streamline your purchasing experience.`,
    },

    {
      title: "Returns & Refunds",
      idName: "Returns",
      text: `At ${companyName}, we strive to ensure your satisfaction with every purchase. If for any reason you need to return a product or request a refund, contact our customer support team at ${mailAddress} for assistance. We're committed to making your returns and refunds experience as seamless as possible.`,
    },
  ],
};
const aboutUs = {
  title: "About Us",
  idName: "Aboutus",
  sections: [
    {
      title: "Careers",
      idName: "Careers",
      text: `Join our team and explore exciting career opportunities with ${companyName}. We are always looking for talented and passionate individuals who want to contribute to our success. Contact us at ${mailAddress} to express your interest.`,
    },
    {
      title: "Track Your Order",
      idName: "Track",
      text: `Keep tabs on your order effortlessly with our user-friendly order tracking system. Simply provide your order details, and voila! Instantly receive updates on the current status and location of your shipment. If you have any questions or need further assistance regarding your order, our dedicated customer support team is here to help. Feel free to reach out to us at ${mailAddress}, and we'll ensure you're in the know every step of the way.`,
    },
    {
      title: "Privacy Policy",
      idName: "Privacy",
      text: `Your privacy matters to us. Read our privacy policy to understand how we collect, use, and protect your personal information. If you have any privacy-related questions, please contact us at ${mailAddress}.`,
    },
  ],
};

export const main = [aboutUs, customerCare];

const AboutUs = () => {
  const location = useLocation();
  const sectionId = location.hash.substring(1);

  useEffect(() => {
    const element = document.getElementById(
      sectionId.substring(0, 1).toUpperCase() + sectionId.substring(1)
    );
    if (element) {
      element.scrollIntoView();
    }
  }, [location, window.location.hash]);

  return main.map((m) => (
    <Box key={m.title}>
      <Divider sx={{ borderColor: shades.neutral[600], width: "100%" }} />
      <Box
        id={m.idName}
        style={{
          background: `linear-gradient(0deg, ${shades.neutral[100] + "00"}, ${
            shades.neutral[100]
          })`,
        }}
      >
        <Box width="80%" padding="80px 0" margin="0 auto" id={m.idName}>
          <Typography
            variant="h1"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            {m.title}
          </Typography>
          {m.sections.map((section) => (
            <Section
              key={section.idName}
              idName={section.idName}
              text={section.text}
              title={section.title}
            />
          ))}
        </Box>
      </Box>
    </Box>
  ));
};

export default AboutUs;
