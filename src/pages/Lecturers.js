import { Box, Flex } from "@chakra-ui/react";
import LecturersCard from "../components/LecturersCard";
import { db } from "../firebase/firebase";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useEffect } from "react";

const Lecturers = () => {
  const fetchLecturers = async () => {
    let data = [];
    try {
      const lecturers = db.collection("lecturers");

      const snapshot = await lecturers.get();
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, lecturer: doc.data() });
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {

  // // })

  const { isLoading, isError, isIdle, data, error } = useQuery(
    "lecturers",
    fetchLecturers
  );

  if (isLoading || isIdle) {
    return <Loader />;
  }

  if (isError) {
    return <Error>{error.message}</Error>;
  }

  return (
    <Box>
      <Flex p="2rem" flexWrap="wrap" justifyContent="space-between">
        {data.map(({ id, lecturer }) => (
          <LecturersCard
            key={id}
            id={id}
            department={lecturer.department}
            imageUrl={lecturer.imageUrl}
            name={lecturer.name}
            star={lecturer.star}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Lecturers;
