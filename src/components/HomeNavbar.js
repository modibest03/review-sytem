import { Box, Flex, createStandaloneToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

const HomeNavbar = ({ currentUser }) => {
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
      height="15vh"
      backgroundColor="secondary"
      p="4rem 15.7rem"
      align="flex-end"
      boxShadow="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Link
          style={{ fontSize: "3rem", fontWeight: "500", color: "#359EF7" }}
          to="/"
          fontSize="3rem"
          fontWeight="500"
          color="tertiary"
        >
          Home
        </Link>
      </Box>
      <Flex width="40%" color="tertiary" justifyContent="flex-end">
        <Link
          style={{ fontSize: "2rem", color: "#359EF7", marginRight: "4rem" }}
          to="/lecturers"
        >
          Lecturers
        </Link>

        {currentUser ? (
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
            style={{ fontSize: "2rem", color: "#359EF7", marginRight: "4rem" }}
            to="/signin"
          >
            Signin
          </Link>
        )}

        {currentUser?.isAdmin && (
          <Link
            style={{ fontSize: "2rem", color: "#359EF7", marginRight: "4rem" }}
            to="/admin"
          >
            Admin
          </Link>
        )}

        {currentUser?.isAdmin && (
          <Link
            style={{ fontSize: "2rem", color: "#359EF7" }}
            to="/createLecturer"
          >
            CreateLecturer
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default HomeNavbar;
