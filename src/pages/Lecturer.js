import {
  Box,
  Button,
  Flex,
  Textarea,
  createStandaloneToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LecturerHead from "../components/LecturerHead";
import StudentReview from "../components/StudentReview";
import ReactStars from "react-rating-stars-component";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import firebase from "firebase";
import { useQueryClient } from "react-query";
import Loader from "../components/Loader";

const Lecturer = () => {
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewIsLoading, setReviewIsLoading] = useState(false);
  let { lecturerid } = useParams();
  const toast = createStandaloneToast();
  const queryClient = useQueryClient();
  const auth = queryClient.getQueryData("authenticate");

  const fetchLecturer = async (id) => {
    try {
      const lecturers = db.collection("lecturers").doc(id);
      const snapshot = await lecturers.get();
      const res = snapshot.data();
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setReviewIsLoading(true);

    try {
      const lecturerReviews = db
        .collection("lecturers")
        .doc(lecturerid)
        .collection("reviews");
      const observer = lecturerReviews
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) => {
          setReviews(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              lecturer: doc.data(),
            }))
          );
        });
      setReviewIsLoading(false);
      return () => {
        observer();
      };
    } catch (error) {
      console.log(error);
    }
  }, [lecturerid]);

  const {
    isLoading: lecturerIsLoading,
    isError: lecturerIsError,
    data: lecturerData,
  } = useQuery(["lecturerReview", lecturerid], () => fetchLecturer(lecturerid));

  const ratingChanged = (newRating) => {
    setStar(newRating);
  };

  const handleSubmit = async () => {
    if (!star || review === "") {
      toast({
        title: "Info",
        description: "Please fill all the fields",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    let date = new Date();
    setLoading(true);
    try {
      db.collection("lecturers")
        .doc(lecturerid)
        .collection("reviews")
        .add({
          date: date.toLocaleDateString(),
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          star: star,
          review: review,
        })
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error",
              description: "An error occur unable to Add review.",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
          } else {
            setLoading(false);
            toast({
              title: "Success.",
              description: "Posted review successful",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
            setStar(0);
            setReview("");
          }
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box background="grey.20" h="100vh" overflow="hidden">
      {lecturerIsLoading || reviewIsLoading ? (
        <Loader />
      ) : (
        <>
          <LecturerHead
            department={lecturerData.department}
            imageUrl={lecturerData.imageUrl}
            name={lecturerData.name}
            star={lecturerData.star}
          />
          <Flex p="10rem 18rem 0 18rem" height="70%">
            <div className="lecturer">
              {reviews.map(({ id, lecturer }) => (
                <StudentReview
                  key={id}
                  star={lecturer.star}
                  review={lecturer.review}
                  date={lecturer.date}
                />
              ))}
            </div>
            <Flex
              flexDir="column"
              ml="3rem"
              backgroundColor="secondary"
              flexBasis="30%"
              p="2rem"
              display={auth ? "flex" : "none"}
            >
              <Box alignSelf="center">
                <ReactStars
                  onChange={ratingChanged}
                  count={5}
                  size={44}
                  value={star}
                  edit={true}
                />
              </Box>
              <Box flexGrow="1">
                <Box height="25rem">
                  <Textarea
                    placeholder="Write Your Review"
                    flexGrow="1"
                    isRequired
                    size="lg"
                    fontSize="2rem"
                    h="100%"
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                  />
                </Box>
                <Button
                  mt="1rem"
                  background="tertiary"
                  p="2rem"
                  fontSize="1.5rem"
                  w="100%"
                  color="secondary"
                  isDisabled={loading}
                  onClick={handleSubmit}
                >
                  SEND
                </Button>
              </Box>
            </Flex>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Lecturer;
