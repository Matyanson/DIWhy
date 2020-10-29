import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { db, auth } from '../firebase';
import { useRouter } from 'next/router';

const Uploader = ()=> {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ errorMsg, setError] = useState("");
    let error = false;
    

    async function submit(){
        error = false;
        console.log(title, email, password);

        //register
        await auth.createUserWithEmailAndPassword(email, password).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            setError(errorMessage+" code: "+errorCode);
            error = true;
        });
        //login
        await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            setError(errorMessage+" code: "+errorCode);
            error = true;
        });

        //redirect
        router.push('/');
    }

    
  return (
    <div className="Test">
        <form onSubmit={ e => {
          e.preventDefault();
          submit();
        }} >
            Username <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/><br/>
            Email <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
            Password <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            {
                error &&
                <p>{errorMsg}</p>
            }
            <button>Register</button>
        </form>
    </div>
  );
}

export default Uploader;