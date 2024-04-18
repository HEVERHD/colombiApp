import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth/authSlice";
import { Fireauth } from "../firebase/config";

export const useCheckAuth = () => {
    
 const { status } = useSelector( state => state.auth)

 const dispatch = useDispatch();


 useEffect(() => {
   onAuthStateChanged( Fireauth, async(user) => {
    if(!user) return dispatch(logout());
    const {email,displayName,photoURL, uid} = user;
    dispatch(login({ email, displayName, photoURL, uid}))
   } )
 
 }, [])

 return{
    status
 }
}