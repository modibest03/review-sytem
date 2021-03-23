import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import ReactStars from "react-rating-stars-component";

const StudentReview = ({ date, review, star }) => {
  return (
    <Box
      flexBasis={["100%", "100%", "100%", "60%"]}
      backgroundColor="secondary"
      p="3rem"
      boxShadow="lg"
      borderRadius="2rem"
      mt={["3rem", "3rem", "3rem", "1rem"]}
      mr="3rem"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <ReactStars count={5} size={24} value={star} edit={false} />
        <Text
          fontWeight="600"
          fontSize={["1.5rem", "1.5rem", "1.5rem", "1.3rem"]}
        >
          {date}
        </Text>
      </Flex>
      <Text
        mt="3rem"
        fontSize={["1.5rem", "1.5rem", "2rem", "1.5rem"]}
        fontWeight="500"
      >
        {review}
      </Text>
    </Box>
  );
};

export default StudentReview;
