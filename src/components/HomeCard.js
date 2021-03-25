import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";

const HomeCard = ({ review, lecturer }) => {
  return (
    <Box
      flexBasis={["100%", "100%", "100%", "30%"]}
      backgroundColor="secondary"
      p={["3rem", "3rem", "4rem", "2rem"]}
      boxShadow="lg"
      borderRadius="1rem"
      mt={["5rem", "5rem", "2rem"]}
    >
      <Text
        fontSize={["2rem", "2.3rem", "2.7rem", "1.6rem"]}
        fontWeight="500"
        textAlign="center"
        mb="3rem"
      >
        {review.slice(0, 200)}
      </Text>
      <Flex alignItems="center">
        <Avatar
          name="Dan Abrahmov"
          src={lecturer?.imageUrl}
          size={["xl"]}
          mr="2rem"
          border="2px solid #359EF7"
        />
        <Box>
          <ReactStars count={5} size={24} value={lecturer.star} edit={false} />
          <Text
            color="tertiary"
            fontSize={["1.4rem", "1.4rem", "2.5rem", "1.4rem"]}
            fontWeight="500"
          >
            {lecturer.name}
          </Text>
          <Text
            color="tertiary"
            fontSize={["1.2rem", "1.2rem", "1.8rem", "1.2rem"]}
            fontWeight="500"
          >
            {lecturer.department}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeCard;
