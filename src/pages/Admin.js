import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { db } from "../firebase/firebase";
import LecturerCard from "../components/LecturerCard";
import UserCard from "../components/UserCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import AdminUser from "../components/AdminUser";
import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchLecturers = async () => {
    let data = [];
    try {
      const lecturers = db.collection("lecturers");

      const snapshot = await lecturers.get();
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, lecturer: doc.data() });
        console.log(doc.id, "=>", doc.data());
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    let data = [];
    try {
      const lecturers = db.collection("users");

      const snapshot = await lecturers.get();
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, user: doc.data() });
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const {
    isLoading: lecturersLoading,
    isError: lecturersisError,
    data: lecturersdata,
    error: lecturesError,
  } = useQuery("lecturers", fetchLecturers);

  const {
    isLoading: usersLoading,
    isError: usersisError,
    data: usersdata,
    error: usersError,
  } = useQuery("users", fetchUsers);

  return (
    <Box background="brightGrey" height="100vh">
      <Flex
        as="nav"
        height="8vh"
        backgroundColor="secondary"
        p="0 15.7rem"
        align="flex-end"
        boxShadow="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text color="tertiary" fontSize="2.5rem" fontWeight="500">
            ADMIN
          </Text>
        </Box>

        <Flex alignItems="center">
          <Box>
            <Button
              border="none"
              backgroundColor="transparent"
              fontSize="1.8rem"
              fontWeight="400"
              onClick={onOpen}
              color="tertiary"
              mr="1rem"
              _hover={{
                backgroundColor: "transparent",
              }}
              _focus={{
                border: "none",
              }}
            >
              AdminSignUp
            </Button>
            <Modal
              onClose={onClose}
              isOpen={isOpen}
              size="4xl"
              p="2rem"
              isCentered
            >
              <ModalOverlay />
              <ModalContent p="2rem">
                <ModalBody>
                  <AdminUser onClose={onClose} />
                </ModalBody>
                <ModalFooter>
                  <Button fontSize="2rem" p="2rem" mt="1rem" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
          <Box>
            <Link to="/" style={{ fontSize: "2rem", color: "#359EF7" }}>
              home
            </Link>
          </Box>
        </Flex>
      </Flex>
      <Box w="70%" h="85vh" margin="2rem auto" overflowY="scroll">
        <Tabs
          isLazy
          backgroundColor="secondary"
          width="100%"
          h="100%"
          isFitted
          id="admin"
        >
          <TabList
            position="sticky"
            top="0"
            boxShadow="lg"
            backgroundColor="secondary"
            zIndex="10"
          >
            <Tab fontSize="2.5rem">Lecturers</Tab>
            <Tab fontSize="2.5rem">Users</Tab>
          </TabList>
          <TabPanels id="admin" background="secondary">
            {/* initially mounted */}
            <TabPanel p="2rem">
              <Flex flexWrap="wrap">
                {lecturersLoading && <p>loading......</p>}
                {lecturersisError && <p>{lecturesError}</p>}
                {lecturersdata?.map(({ id, lecturer }) => (
                  // console.log(lecturer)
                  <LecturerCard
                    key={id}
                    id={id}
                    name={lecturer.name}
                    department={lecturer.department}
                    imageUrl={lecturer.imageUrl}
                    rating={lecturer.star}
                  />
                ))}
              </Flex>
            </TabPanel>
            {/* initially not mounted */}
            <TabPanel>
              <Flex flexWrap="wrap">
                {usersLoading && <p>loading......</p>}
                {usersisError && <p>{usersError}</p>}
                {usersdata?.map(({ id, user }) => (
                  // console.log(user)
                  <UserCard
                    key={id}
                    fullname={user.FullName}
                    email={user.email}
                    isAdmin={user.isAdmin}
                    username={user.username}
                  />
                ))}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Admin;
