import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import SignIn from "../components/SignIn";
import images from "../assets/image5.jpg";
import SignUp from "../components/SignUp";

const UserInfo = () => {
  const [state, setState] = useState("signin");

  return (
    <Flex
      backgroundImage={[
        "none",
        "none",
        "none",
        `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${images})`,
      ]}
      height="100vh"
      backgroundSize="cover"
      backgroundPosition="center"
      justifyContent="center"
      alignItems="center"
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
