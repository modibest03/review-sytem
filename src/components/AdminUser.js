import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormErrorMessage, FormControl, Input, Button } from "@chakra-ui/react";
import { db, auth } from "../firebase/firebase";
import firebase from "firebase";

import "./AdminForm.css";

const AdminUser = ({ onClose }) => {
  const { handleSubmit, errors, register, formState } = useForm();
  const [loading, setLoading] = useState(false);

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  function onSubmit(data) {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({
          displayName: data.fullname,
        });
        db.collection("users").add({
          timesstamp: firebase.firestore.FieldValue.serverTimestamp(),
          FullName: data.fullname,
          email: data.email,
          password: data.password,
          isAdmin: true,
          uid: userCredential.user.uid,
        });
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.fullname}>
        <Input
          name="fullname"
          placeholder="Fullname"
          p="2rem 0"
          fontSize="2rem"
          border="none"
          borderBottom="2px solid #359EF7"
          borderRadius="none"
          _focus={{
            border: "none",
            borderBottom: "2px solid #359EF7",
          }}
          _hover={{
            borderBottom: "2px solid #359EF7",
          }}
          ref={register({ validate: validateName })}
        />
        <FormErrorMessage>
          {errors.fullname && errors.fullname.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          p="2rem 0"
          fontSize="2rem"
          border="none"
          borderBottom="2px solid #359EF7"
          borderRadius="none"
          _focus={{
            border: "none",
            borderBottom: "2px solid #359EF7",
          }}
          _hover={{
            borderBottom: "2px solid #359EF7",
          }}
          ref={register({ validate: validateName })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password} mt="1rem">
        <Input
          fontSize="2rem"
          name="password"
          type="password"
          placeholder="Password"
          p="2rem 0"
          border="none"
          borderBottom="2px solid #359EF7"
          borderRadius="none"
          _focus={{
            border: "none",
            borderBottom: "2px solid #359EF7",
          }}
          _hover={{
            borderBottom: "2px solid #359EF7",
          }}
          ref={register({ validate: validateName })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt="2rem"
        p="2rem"
        bgColor="tertiary"
        fontSize="2.5rem"
        color="secondary"
        width="100%"
        isLoading={formState.isSubmitting}
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting" : "Submit"}
      </Button>
    </form>
  );
};

export default AdminUser;
