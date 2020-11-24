import React, { useEffect, useState, useContext } from 'react';
import nookies from 'nookies'
import firebase from 'firebase/app';
import '../firebase';

// ...

const AuthContext = React.createContext<any | null >(null);

export default function AuthProvider({ children, token, initialUser }: any) {
  const [user, setUser] = useState<any | null>(initialUser);
  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', {});
        return;
      }
      
      const token = await user.getIdToken();
      //setUser(user);
      nookies.set(undefined, 'token', token, {});
    });
  }, []);
  return (
    <AuthContext.Provider value={user}>{
      children
    }</AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};