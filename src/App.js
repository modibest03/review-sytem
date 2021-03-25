import { useEffect, useState } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import Admin from "./pages/Admin";
import Lecturers from "./pages/Lecturers";
import { auth, db } from "./firebase/firebase";
import AdminForm from "./components/AdminForm";
import Lecturer from "./pages/Lecturer";
import HomeNavbar from "./components/HomeNavbar";
import { useQueryClient } from "react-query";

function App() {
  const [authenticate, setAuthenticate] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthenticate(authUser);
        queryClient.setQueryData("authUser", authUser);
      } else {
        setAuthenticate(null);
        queryClient.setQueryData("authUser", null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [authenticate, queryClient]);

  useEffect(() => {
    if (authenticate) {
      const getUsers = async () => {
        const citiesRef = db.collection("users");
        const snapshot = await citiesRef.get();
        snapshot.forEach((doc) => {
          if (authenticate.uid === doc.data().uid) {
            queryClient.setQueryData("authenticate", doc.data());
            setCurrentUser(doc.data());
          }
        });
      };
      getUsers();
    }
  }, [authenticate, queryClient]);

  return (
    <div className="App">
      <Route exact path="/">
        <HomeNavbar currentUser={currentUser} authenticate={authenticate} />
        <Home />
      </Route>
      <Route path="/lecturers">
        <HomeNavbar currentUser={currentUser} authenticate={authenticate} />
        <Lecturers />
      </Route>
      <Route path="/signin">
        <UserInfo />
      </Route>
      <Route path="/admin">
        {currentUser?.isAdmin ? <Admin /> : <Redirect to={"/"} />}
      </Route>
      <Route path="/createLecturer">
        <HomeNavbar currentUser={currentUser} authenticate={authenticate} />
        {currentUser?.isAdmin ? <AdminForm /> : <Redirect to={"/"} />}
      </Route>
      <Route path="/lecturer/:lecturerid/reviews">
        <Lecturer />
      </Route>
    </div>
  );
}

export default App;
