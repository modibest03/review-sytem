import { Box, Flex, Avatar, Text, Icon } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import { MdDelete } from "react-icons/md";
import { db } from "../firebase/firebase";

const LecturerCard = ({ name, department, imageUrl, rating, id }) => {
  const firstExample = {
    size: 17,
    value: rating,
    edit: false,
  };

  const deleteLecturer = async () => {
    try {
      const res = await db.collection("lecturers").doc(`${id}`).delete();
      window.location.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width="32%"
      backgroundColor="secondary"
      p="2rem"
      boxShadow="lg"
      borderRadius="1rem"
      mt="1rem"
      position="relative"
      mr="1rem"
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
          <ReactStars {...firstExample} />
          <Text color="tertiary" fontSize="1.4rem" fontWeight="500">
            {name}
          </Text>
          <Text color="tertiary" fontSize="1.2rem" fontWeight="500">
            {department}
          </Text>
        </Box>
      </Flex>
      <Box
        position="absolute"
        top="2rem"
        right="2rem"
        _hover={{ cursor: "pointer" }}
        onClick={deleteLecturer}
      >
        <Icon as={MdDelete} w="2rem" h="auto" color="red.500" />
      </Box>
    </Box>
  );
};

export default LecturerCard;
