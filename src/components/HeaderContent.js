import { Box, Flex, Text, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import reviewSvg from "../assets/image4.png";

const HeaderContent = () => {
  return (
    <Flex
      justifyContent="space-between"
      height="85vh"
      p="5rem"
      alignItems="center"
    >
      <Box w="63.4rem" paddingLeft="14rem" width="60rem">
        <Heading fontSize="6.3rem" fontWeight="400" mb="2.7rem">
          Every Review is an{" "}
          <Box as="span" fontWeight="700" color="tertiary">
            Experience!
          </Box>
        </Heading>
        <Text fontSize="2rem" mb="2.7rem" fontWeight="">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          erat.
        </Text>
        <Link
          style={{
            padding: "1.5rem 10rem 1.5rem 2.5rem",
            backgroundColor: "#359EF7",
            fontSize: "2.2rem",
            color: "#fff",
          }}
          to="/lecturers"
        >
          View all Lecturers
        </Link>
      </Box>
      <Box width="90rem" height="auto">
        <Image
          src={reviewSvg}
          alt="review system illustrator"
          objectFit="cover"
          marginLeft="19.5rem"
          boxSize="95%"
        />
      </Box>
    </Flex>
  );
};

export default HeaderContent;
