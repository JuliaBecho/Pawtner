import { createContext, useContext, useEffect, useState} from "react"
import {initializeApp} from "firbase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getIdToken,
    onAuthStateChanged,
  } from "firebase/auth";
  

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({children}) => {
    const[firebaseApp, setFirebaseApp]= useState(null);
    const[firebaseAuth, setFirebaseAuth]= useState(null);
    const[user,setUser]= useState(null);

    useEffect(() =>{
        const firebaseConfig = {
            apiKey: "AIzaSyBK0qgSQjZCe2r7M_sFLtWZsN5Dx2fYndg",
            authDomain: "pawtner-b4740.firebaseapp.com",
            projectId: "pawtner-b4740",
            storageBucket: "pawtner-b4740.firebasestorage.app",
            messagingSenderId: "588675354074",
            appId: "1:588675354074:web:0d3cd1cecbd9e6c9b904e3"
          };

          const app = initializeApp(firebaseConfig);
          const auth = getAuth(app);
          setFirebaseApp(app);
          setFirebaseAuth(auth);

          const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
          })

          return ()=> unsubscribe();

    },[]);

    const signup = async(email, password) => {
        try{
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        }catch(error){
            throw error;
        }
    }

    
    const login = async(email, password) => {
        try{
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        }catch(error){
            throw error;
        }
    }

    const logout = () => {
        signOut(firebaseAuth);
    }

    const getToken = async() => {
        try{
            await getIdToken(user);
        }catch(error){
            throw error;
        }
    }

    if(!firebaseApp) return null;


    return(
        <FirebaseContext.Provider value={{
            app:firebaseApp,
            auth:firebaseAuth,
            user,
            signup, 
            login,
            logout,
            getToken,
        }}>
            {children}
        </FirebaseContext.Provider>

    )
}

export const userFirebase = () => {
    const context =useContext(FirebaseContext);
    if(!context){
        throw new Error('Firebase provider error');
    }

    return context;
}