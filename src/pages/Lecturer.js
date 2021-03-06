import {
  Box,
  Flex,
  createStandaloneToast,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LecturerHead from "../components/LecturerHead";
import StudentReview from "../components/StudentReview";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import firebase from "firebase";
import { useQueryClient } from "react-query";
import Loader from "../components/Loader";
import { AiTwotoneMessage } from "react-icons/ai";
import Error from "../components/Error";
import * as api from "../api/api";
import LecturerFormMobile from "../components/LecturerFormMobile";
import LecturerFormDesktop from "../components/LecturerFormDesktop";

const Lecturer = () => {
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewIsLoading, setReviewIsLoading] = useState(false);
  const [reveiwsId, setReveiwsId] = useState([]);
  const [averageReview, setAverageReview] = useState(null);
  const [reviewStars, setReviewStars] = useState([]);
  let { lecturerid } = useParams();
  const toast = createStandaloneToast();
  const queryClient = useQueryClient();
  const auth = queryClient.getQueryData("authenticate");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    error: lecturerError,
    data: lecturerData,
  } = useQuery(["lecturerReview", lecturerid], () =>
    api.fetchLecturer(lecturerid)
  );

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
          authUid: auth?.uid,
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
      alert(error);
    }
  };

  useEffect(() => {
    if (reviews) {
      setReveiwsId(reviews.map((rev) => rev?.lecturer?.authUid));
      setReviewStars(reviews.map((rev) => rev?.lecturer?.star));
    }
  }, [reviews]);

  useEffect(() => {
    if (reviewStars) {
      let total_users_rated = reviews.length;
      let sum_of_max_rating_of_user_count = total_users_rated * 5;
      let sum_of_rating = reviewStars.reduce((a, b) => a + b, 0);
      setAverageReview(
        Math.round((sum_of_rating * 5) / sum_of_max_rating_of_user_count)
      );
    }
  }, [reviewStars, reviews]);

  useEffect(() => {
    if (averageReview) {
      if (averageReview !== lecturerData?.star) {
        const lecturers = db.collection("lecturers").doc(lecturerid);
        return lecturers.update({
          star: averageReview,
        });
      }
    }
  });

  return (
    <Box background="grey.20" h="100vh" overflow="hidden">
      {lecturerIsLoading || reviewIsLoading ? (
        <Loader />
      ) : lecturerIsError ? (
        <Error>{lecturerError.message}</Error>
      ) : (
        <>
          {averageReview && (
            <LecturerHead
              department={lecturerData.department}
              imageUrl={lecturerData.imageUrl}
              name={lecturerData.name}
              star={averageReview}
            />
          )}
          <Box
            position="fixed"
            bottom={["5rem"]}
            left={["30rem", "30rem", "85rem", "60rem"]}
            backgroundColor="tertiary"
            p="1rem"
            borderRadius="100rem"
            onClick={onOpen}
            display={[
              auth && reveiwsId.includes(auth?.uid)
                ? "none"
                : auth
                ? "block"
                : "none",
              auth && reveiwsId.includes(auth?.uid)
                ? "none"
                : auth
                ? "bloc"
                : "none",
              auth && reveiwsId.includes(auth?.uid)
                ? "none"
                : auth
                ? "bloc"
                : "none",
              "none",
            ]}
          >
            <Icon as={AiTwotoneMessage} color="secondary" boxSize={[50, 50]} />
          </Box>
          <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent
              top={["27rem", "18.5rem"]}
              borderTopLeftRadius="2rem"
              borderTopRightRadius="2rem"
            >
              <ModalBody>
                <LecturerFormMobile
                  ratingChanged={ratingChanged}
                  star={star}
                  setReview={setReview}
                  review={review}
                  loading={loading}
                  handleSubmit={handleSubmit}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Flex
            p={["4rem 3rem", "4rem 3rem", "5rem 3rem", "10rem 14rem 0 14rem"]}
            height={["100%", "100%"]}
          >
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
            <LecturerFormDesktop
              ratingChanged={ratingChanged}
              star={star}
              setReview={setReview}
              review={review}
              loading={loading}
              handleSubmit={handleSubmit}
              auth={auth}
              reveiwsId={reveiwsId}
            />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Lecturer;
