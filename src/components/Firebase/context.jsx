import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import db from './firebase'


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth); 
  };

  const sign = async (auth,email, password) =>{
    try {
      return  await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error.message;
    }
  }

  const passwordReset = (email) =>{
    return sendPasswordResetEmail(auth, email);
  }

  return (
    <AuthContext.Provider value={{ user, login, sign, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

