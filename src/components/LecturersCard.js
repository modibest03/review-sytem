import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Text, LinkBox } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const LecturersCard = ({ id, department, imageUrl, name, star }) => {
  return (
    <LinkBox
      width="36.2rem"
      flexBasis={["100%", "100%", "100%", "30%"]}
      backgroundColor="secondary"
      p="2rem"
      boxShadow="lg"
      borderRadius="1rem"
      mt="3rem"
      position="relative"
      mr={["none", "none", "none", "4.9rem"]}
      as={RouterLink}
      to={`/lecturer/${id}/reviews`}
    >
      <Flex alignItems="center">
        <Avatar
          name="Dan Abrahmov"
          src={imageUrl}
          width={["5rem", "5rem", "10rem", "5rem"]}
          height={["5rem", "5rem", "10rem", "5rem"]}
          mr="2rem"
          border="2px solid #359EF7"
        />
        <Box>
          <ReactStars count={5} size={35} value={star} edit={false} />
          <Text
            color="tertiary"
            fontSize={["1.4rem", "1.4rem", "3rem", "1.4rem"]}
            fontWeight="500"
          >
            {name}
          </Text>
          <Text
            color="tertiary"
            fontSize={["1.4rem", "1.4rem", "2rem", "1.4rem"]}
            fontWeight="500"
          >
            {department}
          </Text>
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default LecturersCard;
