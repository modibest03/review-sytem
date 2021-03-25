import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { db, storage } from "../firebase/firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

import "./AdminForm.css";

const AdminForm = () => {
  const history = useHistory();
  const { handleSubmit, errors, register, formState } = useForm();
  const [loading, setLoading] = useState(false);

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  function onSubmit(value) {
    setLoading(true);
    const storageRef = storage.ref();
    const uploadTask = storageRef
      .child(`images/${value.imageUrl[0].name}`)
      .put(value.imageUrl[0]);
    uploadTask.on(
      "state_changed",
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(value.imageUrl[0].name)
          .getDownloadURL()
          .then((url) => {
            db.collection("lecturers").add({
              timesstamp: firebase.firestore.FieldValue.serverTimestamp(),
              star: 1,
              name: value.name,
              department: value.department,
              imageUrl: url,
            });
            setLoading(false);
          });
        history.push("/lecturers");
      }
    );
  }

  return (
    <Box p={["3rem"]} width={{ xl: "40%" }} margin={{ xl: "0 auto" }}>
      <Box
        flexBasis={["100%", "100%", "30%"]}
        margin={["10rem auto", "5rem auto"]}
        boxShadow="2xl"
        borderRadius="1rem"
        p={["3rem", "5rem", "3rem"]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name}>
            <Input
              name="name"
              placeholder="Name"
              p="2rem 0"
              fontSize={["3rem", "3rem", "2rem"]}
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
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.department} mt="1rem">
            <Input
              fontSize={["3rem", "3rem", "2rem"]}
              name="department"
              placeholder="Department"
              p="2rem 0"
              border="none"
              borderBottom="2px solid #359EF7"
              borderRadius="none"
              mt="3rem"
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
              {errors.department && errors.department.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.imageUrl} mt="2rem">
            <Input
              fontSize={["3rem", "3rem", "2rem"]}
              name="imageUrl"
              type="file"
              height="100%"
              p="0"
              mt="2rem"
              border="none"
              borderRadius="none"
              ref={register({ validate: validateName })}
            />
            <FormErrorMessage>
              {errors.imageUrl && <p>please enter field</p>}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="5rem"
            p={["3rem", "3.5rem", "2rem"]}
            bgColor="tertiary"
            fontSize={["3rem", "4rem", "2.5rem"]}
            color="secondary"
            width="100%"
            isLoading={formState.isSubmitting}
            isDisabled={loading}
            disabled={loading}
            type="submit"
          >
            {loading ? "Submitting" : "Submit"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdminForm;
