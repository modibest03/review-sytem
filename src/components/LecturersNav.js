import { Button } from "@chakra-ui/button";
import { Search2Icon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import Footer from "./Footer";

const LecturersNav = () => {
  return (
    <Flex
      as="nav"
      height="15vh"
      backgroundColor="secondary"
      p="4rem 15.7rem"
      align="flex-end"
      boxShadow="md"
      alignItems="center"
    >
      <Flex
        flexGrow="1"
        mr="3rem"
        pb="2rem"
        borderBottom="2px solid #cecdcd"
        alignItems="flex-start"
      >
        <Search2Icon w="2.4rem" height="auto" color="#cecdcd" mr="1rem" />
        <Input
          placeholder="search"
          border="none"
          fontSize="2.8rem"
          _focus={{
            outline: "none",
          }}
        />
      </Flex>
      <Button
        p="2rem 4rem"
        border="3px solid #359EF7"
        fontSize="2rem"
        bgColor="secondary"
        color="tertiary"
        to="/signin"
        _hover={{
          backgroundColor: "secondary",
        }}
        _active={{
          backgroundColor: "grey.30",
        }}
      >
        SIGN UP
      </Button>
    </Flex>
  );
};

export default LecturersNav;
