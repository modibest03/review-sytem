import { Box, Text } from "@chakra-ui/react";
import HeaderContent from "../components/HeaderContent";
import HomeCard from "../components/HomeCard";
import Footer from "../components/Footer";
import { db } from "../firebase/firebase";
import { useQueries } from "react-query";
import { useEffect, useState } from "react";

const Home = () => {
  const [lecturersInfo, setLecturersInfo] = useState([]);
  const [lecturersIds, setLecturersIds] = useState([]);

  const fetchLecturerReviews = async (id) => {
    let data = [];
    try {
      const lecturerReviews = db
        .collection("lecturers")
        .doc(id)
        .collection("reviews");

      const snapshot = await lecturerReviews.get();
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          lecturer: doc.data(),
        });
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    db.collection("lecturers").onSnapshot((snapshot) => {
      setLecturersInfo(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          lecturer: doc.data(),
        }))
      );
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
        queryFn: () => fetchLecturerReviews(lecturer),
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
      <Box as="main">
        {userQueries[0]?.isLoading ||
        userQueries[1]?.isLoading ||
        userQueries[2]?.isLoading ? (
          <Text>Loading.............</Text>
        ) : (
          <Box
            as="section"
            p="13.4rem 6.9rem"
            display="flex"
            justifyContent="space-between"
          >
            <HomeCard
              review={userQueries[0]?.data[0]?.lecturer?.review}
              lecturer={lecturersInfo[0]?.lecturer}
            />
            <HomeCard
              review={userQueries[1]?.data[0]?.lecturer?.review}
              lecturer={lecturersInfo[1]?.lecturer}
            />
            <HomeCard
              review={userQueries[2]?.data[0]?.lecturer?.review}
              lecturer={lecturersInfo[2]?.lecturer}
            />
          </Box>
        )}
      </Box>

      <Box as="footer" backgroundColor="tertiary" p="5rem 19rem 4rem">
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
