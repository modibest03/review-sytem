import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import ReactStars from "react-rating-stars-component";

const StudentReview = ({ date, review, star }) => {
  return (
    <Box
      width="95%"
      backgroundColor="secondary"
      p="3rem"
      boxShadow="lg"
      borderRadius="2rem"
      mt="1rem"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <ReactStars count={5} size={24} value={star} edit={false} />
        <Text fontWeight="600">{date}</Text>
      </Flex>
      <Text mt="3rem" fontSize="1.5rem" fontWeight="500">
        {review}
      </Text>
    </Box>
  );
};

export default StudentReview;
