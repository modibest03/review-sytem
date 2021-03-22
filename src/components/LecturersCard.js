import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Text, LinkBox } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const LecturersCard = ({ id, department, imageUrl, name, star }) => {
  return (
    <LinkBox
      width="32%"
      backgroundColor="secondary"
      p="2rem"
      boxShadow="lg"
      borderRadius="1rem"
      mt="1rem"
      position="relative"
      mr="1rem"
      as={RouterLink}
      to={`/lecturer/${id}/reviews`}
    >
      <Flex alignItems="center">
        <Avatar
          name="Dan Abrahmov"
          src={imageUrl}
          size="lg"
          mr="2rem"
          border="2px solid #359EF7"
        />
        <Box>
          <ReactStars count={5} size={25} value={star} edit={false} />
          <Text color="tertiary" fontSize="1.4rem" fontWeight="500">
            {name}
          </Text>
          <Text color="tertiary" fontSize="1.2rem" fontWeight="500">
            {department}
          </Text>
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default LecturersCard;
