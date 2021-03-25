import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Box,
  Flex,
  createStandaloneToast,
  Link,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as ReachLink } from "react-router-dom";
import { auth } from "../firebase/firebase";
const toast = createStandaloneToast();

const Hamburger = ({ currentUser, authenticate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
    <Box>
      <IconButton
        ref={btnRef}
        icon={<HamburgerIcon />}
        onClick={onOpen}
        size="lg"
        fontSize="3rem"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay>
          <DrawerContent p="3rem">
            <Flex justifyContent="flex-end">
              <IconButton
                ref={btnRef}
                icon={<CloseIcon />}
                onClick={onClose}
                size="lg"
                fontSize="3rem"
              />
            </Flex>
            <DrawerBody>
              <Flex
                display={["flex"]}
                flexDir="column"
                color="tertiary"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Link
                  fontSize="4rem"
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
                    style={{ fontSize: "4rem", color: "#359EF7" }}
                    onClick={logOut}
                  >
                    Logout
                  </Box>
                ) : (
                  <Link
                    to="/signin"
                    as={ReachLink}
                    fontSize="4rem"
                    color="#359EF7"
                    marginRight="4rem"
                  >
                    Signin
                  </Link>
                )}

                {currentUser?.isAdmin && (
                  <Link
                    to="/admin"
                    fontSize="5rem"
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
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Hamburger;
