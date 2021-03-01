import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { db, auth } from '../firebase';
import { useRouter } from 'next/router';
import Button from './styled/Button';

const LoginForm = ()=> {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ errorMsg, setError] = useState<string[]>([]);
    let error = false;
    

    async function submit(){
        error = false;
        
        await login();

        //redirect
        if(!errorMsg || errorMsg.length < 0)
          router.push('/');
    }

    async function login(){
      setError([]);
      await auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        addError(errorMessage+" code: "+errorCode);
        error = true;
      });
    }

    const addError = (err: string)=>{
      setError([...errorMsg, err]);
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
              error &&
              <p>{errorMsg}</p>
            }
            <Button>Sign In</Button>
        </form>
    </div>
  );
}

export default LoginForm;