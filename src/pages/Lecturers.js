import { Box, Flex } from "@chakra-ui/react";
import LecturersCard from "../components/LecturersCard";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import Error from "../components/Error";
import * as api from "../api/api";

const Lecturers = () => {
  const { isLoading, isError, isIdle, data, error } = useQuery(
    "lecturers",
    api.fetchLecturers
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
