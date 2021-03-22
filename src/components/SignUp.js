import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { BiUserCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { auth, db } from "../firebase/firebase";
import firebase from "firebase";
import { navigate } from "@reach/router";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

const SignUp = ({ setState }) => {
  const { handleSubmit, errors, register, formState } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({
          displayName: data.matricNo,
        });
        db.collection("users").add({
          timesstamp: firebase.firestore.FieldValue.serverTimestamp(),
          username: data.matricNo,
          email: data.email,
          password: data.password,
          isAdmin: false,
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Box
      h="46rem"
      w="33rem"
      backgroundColor="secondary"
      borderRadius="1rem"
      opacity="85%"
    >
      <Center>
        <Icon as={BiUserCircle} w="15rem" h="auto" color="tertiary" />
      </Center>
      <Box mt="2rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            height="29rem"
          >
            <FormControl padding="0 2rem" isRequired>
              <Input
                name="matricNo"
                id="matricNo"
                ref={register({ required: true })}
                border="none"
                borderBottom="2px solid rgb(175, 175, 175)"
                borderRadius="none"
                padding="1.5rem 1rem"
                fontSize="1.5rem"
              />
              <FormLabel htmlFor="matricNo" fontSize="1.5rem">
                Enter your Matric No
              </FormLabel>
              <FormErrorMessage>
                {errors.matricNo && "Please enter your matric number"}
              </FormErrorMessage>

              <Input
                name="email"
                id="email"
                ref={register({ required: true })}
                border="none"
                borderBottom="2px solid rgb(175, 175, 175)"
                borderRadius="none"
                padding="1.5rem 1rem"
                fontSize="1.5rem"
              />
              <FormLabel htmlFor="email" fontSize="1.5rem">
                Enter your Email
              </FormLabel>
              <FormErrorMessage>
                {errors.matricNo && "Please enter your matric number"}
              </FormErrorMessage>

              <Input
                name="password"
                ref={register({ required: true })}
                mt="1rem"
                border="none"
                borderBottom="2px solid rgb(175, 175, 175)"
                borderRadius="none"
                padding="1.5rem 1rem"
                fontSize="2rem"
              />
              <FormLabel htmlFor="password" fontSize="1.5rem">
                Enter your password
              </FormLabel>
              <FormErrorMessage>
                {errors.password && "Your input is required"}
              </FormErrorMessage>
              <Text
                mt="1rem"
                fontSize="1.2rem"
                fontWeight="500"
                color="tertiary"
                _hover={{ cursor: "pointer" }}
                onClick={() => setState("signin")}
              >
                click to SignUp
              </Text>
            </FormControl>
            <Button
              mt={4}
              color="secondary"
              backgroundColor="tertiary"
              isLoading={formState.isSubmitting}
              type="submit"
              p="3rem"
              fontSize="2.2rem"
              borderTopRadius="0"
              borderBottomRadius="1rem"
            >
              Sign Up
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
