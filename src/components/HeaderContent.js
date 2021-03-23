import { Box, Flex, Text, Heading, Image, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import reviewSvg from "../assets/image4.png";

const HeaderContent = () => {
  return (
    <Flex
      justifyContent="space-between"
      height={["80vh", "85vh"]}
      p={["2rem", "2rem", "2rem", "2rem", "5rem"]}
      alignItems={["top"]}
    >
      <Box
        flexBasis={["100%", "100%", "100%", "70%"]}
        paddingLeft={["2rem", "2rem", "2rem", "5rem", "14rem"]}
      >
        <Heading
          fontSize={["5rem", "7.5rem", "8rem", "6.3rem"]}
          fontWeight="400"
          mb="2.7rem"
        >
          Every Review is an{" "}
          <Box as="span" fontWeight="700" color="tertiary">
            Experience!
          </Box>
        </Heading>
        <Text
          textAlign={["left"]}
          fontSize={["2.5rem", "2.5rem", "3rem", "2.5rem", "2rem"]}
          mb={["7rem", "5rem"]}
          fontWeight="500"
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          erat.
        </Text>
        <Link
          padding={[
            "2rem 6rem 2rem 2rem",
            "2rem 6rem 2rem 2rem",
            "2rem 6rem 2rem 2rem",
            "1.5rem 10rem 1.5rem 2.5rem",
          ]}
          backgroundColor="#359EF7"
          fontSize={["2.5rem", "2.2rem", "3rem", "2.2rem"]}
          color="#fff"
          as={ReachLink}
          to="/lecturers"
        >
          View all Lecturers
        </Link>
      </Box>
      <Box
        display={["none", "none", "none", "flex"]}
        width="90rem"
        height="auto"
      >
        <Image
          src={reviewSvg}
          alt="review system illustrator"
          objectFit="cover"
          marginLeft={["0", "0", "0", "8rem", "19.5rem"]}
          boxSize="95%"
        />
      </Box>
    </Flex>
  );
};

export default HeaderContent;
