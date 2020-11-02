import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { db, auth } from '../firebase';
import { useRouter } from 'next/router';

const RegisterForm = ()=> {
    const router = useRouter();
    const [username, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ errorMsg, setError] = useState("");
    const [error, setErrorToggle ] = useState(false);
    

    async function submit(){
        const userData = await register();
        console.log(userData);

        saveUserInBD(userData);

        login();

        //redirect
        router.push('/');
    }
    async function saveUserInBD(userData){
        if(userData && userData.user){
            const usr = userData.user;
            db.collection('users').doc(usr.uid).set({
                username: username,
                email: usr.email,
            })
        }
    }
    async function login(){
        await auth.signInWithEmailAndPassword(email, password).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            allert(errorMessage+" code: "+errorCode);
        });
    }

    async function register(){
        const userData = await auth.createUserWithEmailAndPassword(email, password).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            allert(errorMessage+" code: "+errorCode);
        });
        console.log(userData);
        return userData;
    }
    function allert(err){
        setError(err);
        setErrorToggle(true);
    }

    
  return (
    <div>
        <form onSubmit={ e => {
          e.preventDefault();
          submit();
        }} >
            Username <input type="text" value={username} onChange={(e)=>{setTitle(e.target.value)}}/><br/>
            Email <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
            Password <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            {
                error &&
                <p className="error">{errorMsg}</p>
            }
            <button>Register</button>
        </form>
    </div>
  );
}

export default RegisterForm;