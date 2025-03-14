import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getIdToken,
  onAuthStateChanged,
} from "firebase/auth";

//Create a context to share Firebase authentication methods
const FirebaseContext = createContext(null);

//FirebaseProvider: Manages Firebase authentication and provides data to children components
export const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null); //State for Firebase app instance
  const [firebaseAuth, setFirebaseAuth] = useState(null); //State for Firebase authentication instance
  const [user, setUser] = useState(null); //State for the currently logged-in user


  console.log(import.meta.env.VITE_FIREBASE_API_KEY)
  useEffect(() => {
    //Firebase configuration settings
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    console.log(firebaseConfig)
    //Initialize Firebase app and authentication
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    setFirebaseApp(app);
    setFirebaseAuth(auth);

    //Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); //Update user state when authentication changes
    });

    return () => unsubscribe(); //Cleanup function to stop listening on unmount
  }, []);

  //Function to log in an existing user
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw error;
    }
  };

  //Function to log in an existing user
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    signOut(firebaseAuth);
  };

  //Function to get the authentication token for the current user
  const getToken = async () => {
    try {
      return await getIdToken(user);
    } catch (error) {
      throw error;
    }
  };

  //Prevent rendering until Firebase is initialized
  if (!firebaseApp) return null;

  //Provide authentication data and function to child components
  return (
    <FirebaseContext.Provider
      value={{
        app: firebaseApp,
        auth: firebaseAuth,
        user,
        signup,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

//Custom hool to access Firebase authentication data in components
export const userFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("Firebase provider error");
  }

  return context;
};
