import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import SignIn from "../components/SignIn";
import images from "../assets/image5.jpg";
import SignUp from "../components/SignUp";

const UserInfo = () => {
  const [state, setState] = useState("signin");

  return (
    <Flex
      height="100vh"
      backgroundSize="cover"
      backgroundPosition="center"
      justifyContent="center"
      mt="8rem"
    >
      {state === "signup" ? (
        <SignUp setState={setState} />
      ) : (
        <SignIn setState={setState} />
      )}
    </Flex>
  );
};

export default UserInfo;
