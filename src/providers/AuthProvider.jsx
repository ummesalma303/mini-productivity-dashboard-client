import { auth } from "@/firebase/firebase.config";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
 const [loading,setLoading] = useState(true);
   const [user,setUser] = useState(null);
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


    //  useEffect(() => {
        
        
        
   

    
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
       name:'task bite',
       googleLoginUser,
       handleLogout,
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