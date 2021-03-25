import { Box, Skeleton, Flex } from "@chakra-ui/react";
import HeaderContent from "../components/HeaderContent";
import HomeCard from "../components/HomeCard";
import Footer from "../components/Footer";
import { db } from "../firebase/firebase";
import { useQueries } from "react-query";
import { useEffect, useState } from "react";
import * as api from "../api/api";

const Home = () => {
  const [lecturersInfo, setLecturersInfo] = useState([]);
  const [lecturersIds, setLecturersIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    db.collection("lecturers").onSnapshot((snapshot) => {
      setLecturersInfo(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          lecturer: doc.data(),
        }))
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (lecturersInfo) {
      setLecturersIds(lecturersInfo.map((doc) => doc.id));
    }
  }, [lecturersInfo]);

  const userQueries = useQueries(
    lecturersIds.map((lecturer) => {
      return {
        queryKey: ["lecturersReview", lecturer],
        queryFn: () => api.fetchLecturerReviews(lecturer),
        enabled: !!lecturersIds,
      };
    })
  );

  return (
    <Box backgroundColor="grey.10">
      <header
        style={{
          overflowX: "hidden",
        }}
      >
        <HeaderContent />
      </header>
      <Box
        as="main"
        p={[
          "10rem 2rem 17rem 2rem",
          "10rem 2rem 17rem 2rem",
          "10rem 2rem 17rem 2rem",
          "10rem 6.9rem 18.4rem 6.9rem",
        ]}
      >
        {userQueries[0]?.isLoading ||
        userQueries[1]?.isLoading ||
        userQueries[2]?.isLoading ||
        loading ? (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDir={["column", "column", "column", "row"]}
            flexWrap="wrap"
          >
            <Box
              mt={["5rem", "5rem", "2rem"]}
              flexBasis={["100%", "100%", "100%", "30%"]}
            >
              <Skeleton height="30rem" width="100%" />
            </Box>
            <Box
              mt={["5rem", "5rem", "2rem"]}
              flexBasis={["100%", "100%", "100%", "30%"]}
            >
              <Skeleton height="30rem" width="100%" />
            </Box>

            <Box
              mt={["5rem", "5rem", "2rem"]}
              flexBasis={["100%", "100%", "100%", "30%"]}
            >
              <Skeleton height="30rem" width="100%" />
            </Box>
          </Flex>
        ) : (
          <Box
            as="section"
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            {userQueries[0]?.data[0]?.lecturer?.review &&
              lecturersInfo[0]?.lecturer && (
                <HomeCard
                  review={userQueries[0]?.data[0]?.lecturer?.review}
                  lecturer={lecturersInfo[0]?.lecturer}
                />
              )}

            {userQueries[1]?.data[0]?.lecturer?.review &&
              lecturersInfo[1]?.lecturer && (
                <HomeCard
                  review={userQueries[1]?.data[0]?.lecturer?.review}
                  lecturer={lecturersInfo[1]?.lecturer}
                />
              )}

            {userQueries[2]?.data[0]?.lecturer?.review &&
              lecturersInfo[2]?.lecturer && (
                <HomeCard
                  review={userQueries[2]?.data[0]?.lecturer?.review}
                  lecturer={lecturersInfo[2]?.lecturer}
                />
              )}
          </Box>
        )}
      </Box>

      <Box
        as="footer"
        backgroundColor="tertiary"
        p={["2rem", "2rem", "2rem", "5rem 19rem 4rem"]}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
