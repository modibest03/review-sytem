import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { BsBoxArrowRight } from "react-icons/bs";

const LecturerHead = ({ department, name, imageUrl, star }) => {
  return (
    <Box background="tertiary" h="17rem" position="relative">
      <Box
        position="absolute"
        left={["3rem", "3rem", "3rem", "10rem", "25rem"]}
        top={["7rem", "3rem"]}
      >
        <Flex alignItems="top">
          <Box border="10px solid #fff" borderRadius="50%">
            <Avatar
              name="Dan Abrahmov"
              src={imageUrl}
              w={["12rem", "15rem", "17rem"]}
              h={["12rem", "15rem", "17rem"]}
              border="5px solid #359EF7"
            />
          </Box>
          <Box ml={["2rem", "3rem"]}>
            <ReactStars count={5} size={24} value={star} edit={false} />
            <Text
              color="secondary"
              fontSize={["2rem", "3.5rem", "3rem"]}
              fontWeight="500"
            >
              {name}
            </Text>
            <Text
              color="secondary"
              fontSize={["1.4rem", "2rem", "1.8rem"]}
              fontWeight="500"
            >
              {department}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box
        position="absolute"
        right={["3rem", "10rem", "8rem", "15rem", "25rem"]}
        top={["5rem", "6rem"]}
      >
        <Link to="/">
          <Icon color="secondary" boxSize={[35, 50]} as={BsBoxArrowRight} />
        </Link>
      </Box>
    </Box>
  );
};

export default LecturerHead;
