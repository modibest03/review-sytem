import { db } from "../firebase/firebase";

// ----------------------------------------------------------
export const fetchLecturerReviews = async (id) => {
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
    return err;
  }
};

// --------------------------------------------------------------------
export const fetchLecturers = async () => {
  let data = [];
  try {
    const lecturers = db.collection("lecturers");

    const snapshot = await lecturers.get();
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, lecturer: doc.data() });
    });
    return data;
  } catch (err) {
    return err;
  }
};

// ------------------------------------------------------------------------
export const fetchLecturer = async (id) => {
  try {
    const lecturers = db.collection("lecturers").doc(id);
    const snapshot = await lecturers.get();
    const res = snapshot.data();
    return res;
  } catch (err) {
    return err;
  }
};
