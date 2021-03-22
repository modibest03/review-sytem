import { Flex, Box, Heading, Text, Center } from "@chakra-ui/layout";
import { CheckCircleIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import React from "react";

const Footer = () => {
  return (
    <Box color="secondary">
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Box width="50.2rem">
          <Heading fontSize="2.6rem" fontWeight="600" mb="2rem">
            About
          </Heading>
          <Text fontSize="1.4rem">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit.
          </Text>
        </Box>
        <Box width="27rem">
          <Flex>
            <CheckCircleIcon w="2.7rem" h="auto" mr="2rem" />
            <Text fontSize="1.5rem">
              820212 Ring Road Katsina, Katsina State, Nigeria
            </Text>
          </Flex>
          <Flex mt="3rem" mb="3rem">
            <PhoneIcon w="2.7rem" h="auto" mr="2rem" />
            <Text fontSize="1.5rem">+234801 234 5678</Text>
          </Flex>
          <Flex>
            <EmailIcon w="2.7rem" h="auto" mr="2rem" />
            <Text fontSize="1.5rem">hello@review.edu.ng</Text>
          </Flex>
        </Box>
      </Flex>
      <Center mt="5rem" fontSize="1.5rem">
        Copyright ©2021 All rights reserved | LifeJetMagazine
      </Center>
    </Box>
  );
};

export default Footer;
