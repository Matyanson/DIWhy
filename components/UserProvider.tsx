import React, { useEffect, useState, useContext, useMemo } from 'react';
import nookies from 'nookies'
import firebase from 'firebase/app';
import '../firebase';

// ...

const AuthContext = React.createContext<any | null >(null);

export default function AuthProvider({ children, token, initialUser, initialUserData }: any) {
  const [firebaseUser, setfirebaseUser] = useState<any | null>(initialUser);
  const [userData, setUserData] = useState<any | null>(initialUserData);
  const user = useMemo(() => { return firebaseUser ? {...firebaseUser, ...userData} : null }, [firebaseUser, userData])

  useEffect(() => {
    try{
      return firebase.auth().onIdTokenChanged(async (user) => {
        if (!user) {
          setfirebaseUser(null);
          nookies.set(undefined, 'token', '', {});
          return;
        }
        
        const token = await user.getIdToken();
        setfirebaseUser(user);
        nookies.set(undefined, 'token', token, {});
      });
    } catch(e){
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (firebaseUser) {
      try{
        return firebase.firestore().collection('users').doc(firebaseUser.uid).onSnapshot((snapshot)=>{
          const data = snapshot.data();
          const defaultImg = "https://firebasestorage.googleapis.com/v0/b/diwhy-39b77.appspot.com/o/default%2Fprofile.jpg?alt=media&token=9868229e-d8dd-48d7-9947-b08aa19d5043";
          if(data)
            setUserData(data);
          else
            setUserData({
              username: "",
              img: defaultImg
            })
        });
      } catch(e){
        console.log(e);
      }
    }else{
      setUserData(null);
    }
  }, [firebaseUser])

  return (
    <AuthContext.Provider value={user}>{
      children
    }</AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};