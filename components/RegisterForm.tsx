import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { db, auth, storage } from '../firebase';
import { useRouter } from 'next/router';
import FilePicker from './FilePicker';
import ProgressBar from './Progressbar';
import ProfilePic from './ProfilePicture';

const RegisterForm = ()=> {
    const router = useRouter();
    const [username, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ errorMsg, setError] = useState("");
    const [error, setErrorToggle ] = useState(false);
    const [progress, setProgress] = useState(0);
    const [file, setFiles] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    let storageRef = storage.ref();

    function onFileChange(files){
      if(!files || files.length < 1)
        return null;
      const newFile = files[0];
      getImageSrc(newFile);
      setFiles(newFile);
    }
    
    function getImageSrc(file) {
      const reader = new FileReader();
      reader.onload = function(){
        setImgSrc(reader.result);
      }
      reader.readAsDataURL(file);
    }

    async function submit(){
        const userData = await register();
        console.log(userData);

        await saveUser(userData);

    }
    async function saveUser(userData){

        let videoRef = storageRef.child(`/uploadedVideos/${file.name}`);
        let uploadTask = videoRef.put(file);
        await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onProgress, onError, onComplete);

        function onProgress(snapshot){
            let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(temp);
        }

        function onError(error){
            allert(error);
        }

        async function onComplete(){
            let url = await uploadTask.snapshot.ref.getDownloadURL();
            setProgress(0);
            saveUserFirestore(userData, url);

            await login();

            router.push('/');
        }
    }

    async function saveUserFirestore(userData, img){
        if(userData && userData.user){
            const usr = userData.user;
            db.collection('users').doc(usr.uid).set({
                username: username,
                email: usr.email,
                img
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
            Profile pic <FilePicker accept="image/*" onSelect={(d)=>onFileChange(d)} />
            { imgSrc && <ProfilePic src={imgSrc} size={150} /> }<br/>
            {
                error &&
                <p className="error">{errorMsg}</p>
            }
            <button>Register</button>
            <ProgressBar value={progress} />
        </form>
    </div>
  );
}

export default RegisterForm;