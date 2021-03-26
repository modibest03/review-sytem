import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { BiUserCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { auth } from "../firebase/firebase";
import { useState } from "react";

const SignIn = ({ setState }) => {
  let history = useHistory();
  const { handleSubmit, errors, register, formState } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        history.push("/");
        setLoading(false);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
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
      boxShadow="2xl"
    >
      <Center mt="5rem">
        <Icon as={BiUserCircle} w="15rem" h="auto" color="tertiary" />
      </Center>
      <Box mt="2rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            height="24rem"
          >
            <FormControl padding="0 2rem" isRequired>
              <Input
                name="email"
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
                {errors.matricNo && "Your input is required"}
              </FormErrorMessage>

              <Input
                name="password"
                ref={register({ required: true })}
                mt="1rem"
                type="password"
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
                onClick={() => setState("signup")}
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
              disabled={loading}
            >
              Sign In
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;
