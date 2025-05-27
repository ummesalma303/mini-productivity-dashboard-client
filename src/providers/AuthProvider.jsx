import { auth } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
 const [loading,setLoading] = useState(true);
   const [user,setUser] = useState(null);

      // new user
    const createNewUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // update profile
    const updateUserProfile = (updateData) =>{
        // console.log(updateData)
        setLoading(true)
        return updateProfile(auth.currentUser,updateData)
          
    }

  // login user
    const loginUser = (email, password)=>{
        setLoading(true)
       return signInWithEmailAndPassword(auth, email, password)
    }

     //login with google
    const googleLoginUser =()=>{
        return signInWithPopup(auth, provider)
    }

    // logout User
    const handleLogout=()=>{
        setLoading(true)
        signOut(auth).then((res) => {
            console.log(res)
          }).catch((error) => {
            console.log(error)
          });
    }


     
   

    
    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
    setLoading(false);
    setUser(currentUser);
  });

  // Cleanup function to unsubscribe when component unmounts
  return () => {
    unsubscribe();
  };
}, []);

    
     

     const info={
       googleLoginUser,
       handleLogout,
       createNewUser,
       updateUserProfile,
        loginUser,
       loading,
       user
    }
    return (
        <div>
         <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>   
        </div>
    );
};

export default AuthProvider;