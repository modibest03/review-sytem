import { Box, Flex, createStandaloneToast, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { auth } from "../firebase/firebase";
import React from "react";
import Hamburger from "./Hamburger";

const HomeNavbar = ({ currentUser, authenticate }) => {
  const toast = createStandaloneToast();

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        toast({
          title: "Logged Out Successfully",
          description: "Unable to create user account.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        window.location.reload();
      })
      .catch((error) => {
        toast({
          title: "An Error Occured",
          description: "Unable to create user account.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <Flex
      as="nav"
      height={["10vh", "10vh"]}
      backgroundColor="secondary"
      p={["2rem 5rem", "2rem 5rem", "5rem 10rem", "4rem 15.7rem"]}
      align="flex-end"
      boxShadow="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Link
          as={ReachLink}
          to="/"
          fontWeight="500"
          color="tertiary"
          fontSize="3rem"
        >
          Home
        </Link>
      </Box>
      <Flex
        display={["none", "none", "none", "flex"]}
        width="40%"
        color="tertiary"
        justifyContent="flex-end"
      >
        <Link
          fontSize="2rem"
          color="#359EF7"
          marginRight="4rem"
          to="/lecturers"
          as={ReachLink}
        >
          Lecturers
        </Link>

        {currentUser || authenticate ? (
          <Box
            _hover={{ cursor: "pointer" }}
            marginRight="4rem"
            style={{ fontSize: "2rem", color: "#359EF7" }}
            onClick={logOut}
          >
            Logout
          </Box>
        ) : (
          <Link
            to="/signin"
            as={ReachLink}
            fontSize="2rem"
            color="#359EF7"
            marginRight="4rem"
          >
            Signin
          </Link>
        )}

        {currentUser?.isAdmin && (
          <Link
            to="/admin"
            fontSize="2rem"
            color="#359EF7"
            marginRight="4rem"
            as={ReachLink}
          >
            Admin
          </Link>
        )}

        {currentUser?.isAdmin && (
          <Link
            to="/createLecturer"
            fontSize="2rem"
            color="#359EF7"
            marginRight="4rem"
            as={ReachLink}
          >
            CreateLecturer
          </Link>
        )}
      </Flex>
      <Box display={["flex", "flex", "flex", "none"]}>
        <Hamburger authenticate={authenticate} currentUser={currentUser} />
      </Box>
    </Flex>
  );
};

export default HomeNavbar;
