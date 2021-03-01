import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { db, auth } from '../firebase';
import { useRouter } from 'next/router';
import Button from './styled/Button';
import Test from './Test';

const LoginForm = ()=> {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ errorMsg, setError] = useState<string[]>([]);
    

    async function submit(){
      console.log("clear the fucking errorMessages!!!!!");
        setError([""]);
      console.log(errorMsg);
        
        await login();

        //redirect
        if(!errorMsg || errorMsg.length < 0)
          router.push('/');
    }

    async function login(){
      await auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        console.log(errorMsg);
        addError(errorMessage);
      });
    }

    const addError = (err: string)=>{
      setError([...errorMsg, err]);
    }

    const test = ()=>{
      console.log(errorMsg);
    }
    
  return (
    <div className="Test">
        <form onSubmit={ e => {
          e.preventDefault();
          submit();
        }} >
            Email <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
            Password <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            {
              errorMsg && errorMsg.length > 0 &&
              errorMsg.map((e: string, id)=>
                <p key={id} className="error">{e}</p>
              )
            }
            <Button>Sign In</Button>
        </form>
            <Button onClick={()=>test()} >Test</Button>
    </div>
  );
}

export default LoginForm;