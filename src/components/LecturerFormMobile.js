import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import ReactStars from "react-rating-stars-component";

const LecturerFormMobile = ({
  ratingChanged,
  star,
  setReview,
  review,
  loading,
  handleSubmit,
}) => {
  return (
    <Flex
      flexDir="column"
      ml={["none", "3rem"]}
      backgroundColor="secondary"
      p="0 2rem 2rem 2rem"
    >
      <Box alignSelf="center">
        <ReactStars
          onChange={ratingChanged}
          count={5}
          size={44}
          value={star}
          edit={true}
        />
      </Box>
      <Box flexGrow="1">
        <Box height="25rem">
          <Textarea
            placeholder="Write Your Review"
            flexGrow="1"
            isRequired
            size="lg"
            fontSize="2rem"
            h="100%"
            onChange={(e) => setReview(e.target.value)}
            value={review}
          />
        </Box>
        <Button
          mt="3rem"
          background="tertiary"
          p="4rem"
          fontSize="3rem"
          w="100%"
          color="secondary"
          isDisabled={loading}
          onClick={handleSubmit}
        >
          SEND
        </Button>
      </Box>
    </Flex>
  );
};

export default LecturerFormMobile;
