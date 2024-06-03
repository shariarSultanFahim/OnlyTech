import { useQuery } from "@tanstack/react-query";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { auth } from "../Firebase/firebase.init";

export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserLoading(false);
      }
      setUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const axiosSecure = useAxiosSecure();
  const {data:products, isPending:productsLoadig,refetch:refetchProducts} = useQuery({
    queryKey:['products'],
    queryFn: async ()=>{
      const res =await axiosSecure.get('/products')
      return res.data
    }
  })

  const {data:usersProducts,isPending:usersProductLoading,refetch:refetchUsersProducts}=useQuery({
    queryKey:['usersProduct',user],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/products?email=${user?.email}`);
        return res.data;
    }
})


  const authInfo = {
    user,
    setUser,
    userLoading,
    setUserLoading,
    registerUser,
    loginUser,
    googleLogin,
    logOut,
    products,
    productsLoadig,
    refetchProducts,
    usersProducts,
    usersProductLoading,
    refetchUsersProducts
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
