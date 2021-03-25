import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import ReactStars from "react-rating-stars-component";

const LecturerFormDesktop = ({
  ratingChanged,
  star,
  setReview,
  review,
  loading,
  handleSubmit,
  auth,
  reveiwsId,
}) => {
  return (
    <Flex
      flexDir="column"
      ml={["none", "3rem"]}
      backgroundColor="secondary"
      flexBasis="30%"
      p="2rem"
      display={[
        "none",
        "none",
        "none",
        auth && reveiwsId.includes(auth?.uid) ? "none" : auth ? "flex" : "none",
      ]}
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
          mt="1rem"
          background="tertiary"
          p="2rem"
          fontSize="1.5rem"
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

export default LecturerFormDesktop;
