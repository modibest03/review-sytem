import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { BsBoxArrowRight } from "react-icons/bs";

const LecturerHead = ({ department, name, imageUrl, star }) => {
  return (
    <Box background="tertiary" h="17rem" position="relative">
      <Box position="absolute" left="25rem" top="3rem">
        <Flex alignItems="top">
          <Box border="10px solid #fff" borderRadius="50%">
            <Avatar
              name="Dan Abrahmov"
              src={imageUrl}
              // size="2xl"
              w="17rem"
              h="17rem"
              border="5px solid #359EF7"
            />
          </Box>
          <Box ml="3rem">
            <ReactStars count={5} size={24} value={star} edit={false} />
            <Text color="secondary" fontSize="3rem" fontWeight="500">
              {name}
            </Text>
            <Text color="secondary" fontSize="1.8rem" fontWeight="500">
              {department}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box position="absolute" right="25rem" top="6rem">
        <Link to="/">
          <Icon color="secondary" boxSize={50} as={BsBoxArrowRight} />
        </Link>
      </Box>
    </Box>
  );
};

export default LecturerHead;
