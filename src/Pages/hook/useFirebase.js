import React, { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import initializeFirebase from "../Firebase/Firebase.init";
import swal from "sweetalert";
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  // SingIn with google
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        setAuthError(" ");

        if (user?.email) {
          swal({
            title: "Good job!",
            text: "User Successfully Logged In",
            icon: "success",
            button: "Aww yiss!",
          });
        }
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const registerUser = (email, password, name) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setAuthError("");

        const newUser = { email, displayName: name };
        setUser(newUser);

        // send name to firebase after creation

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});

        if (user?.email) {
          swal({
            title: "Good job!",
            text: "User Successfully Created",
            icon: "success",
            button: "Aww yiss!",
          });
        }
      })
      .catch((error) => {
        setAuthError(error.message);
        swal({
          title: "Opps !!!",
          text: error.message,
          icon: "error",
          button: "Try Again",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loginUser = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        if (user?.email) {
          swal({
            title: "Good job!",
            text: "User Successfully Logged In",
            icon: "success",
            button: "Aww yiss!",
          });
        }
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
        swal({
          title: "Opps !!!",
          text: error.message,
          icon: "error",
          button: "Try Again",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  return {
    user,
    setUser,
    isLoading,
    authError,
    signInWithGoogle,
    registerUser,
    loginUser,
    logOut,
  };
};

export default useFirebase;
