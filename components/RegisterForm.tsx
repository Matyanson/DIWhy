import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { db, auth, storage } from '../firebase';
import { useRouter } from 'next/router';
import FilePicker from './FilePicker';
import ProgressBar from './Progressbar';
import ProfilePic from './ProfilePicture';
import Button from './styled/Button';

const defaultProfilePic = "https://firebasestorage.googleapis.com/v0/b/diwhy-39b77.appspot.com/o/default%2Fprofile.jpg?alt=media&token=9868229e-d8dd-48d7-9947-b08aa19d5043";

const defaultForm = {
    username: "",
    email: "",
    img: defaultProfilePic
}

const RegisterForm = ()=> {
    const router = useRouter();
    const [form, setForm] = useState(defaultForm);
    const [password, setPassword] = useState("");
    const [errorMsg, setError] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [file, setFiles] = useState<File>(null);
    const [imgSrc, setImgSrc] = useState(defaultProfilePic);
    let storageRef = storage.ref();

    function onFileChange(files: File[]){
      if(!files || files.length < 1)
        return null;
      const newFile = files[0];
      getImageSrc(newFile);
      setFiles(newFile);
    }
    
    function getImageSrc(file) {
      const reader = new FileReader();
      reader.onload = function(){
          const url = reader.result;
        //if( !(url instanceof ArrayBuffer))
        if(typeof(url) === "string" )
            setImgSrc(url);
      }
      reader.readAsDataURL(file);
    }

    async function submit(){
        const errors = validate();
        console.log(errors);
        setError(errors);
        if(errors.length > 0)
            return;

        const userData = await register();
        if(!userData)
            return;

        await saveUser(userData);

        login();

    }

    function validate(){
        const errors: string[] = [];
        if(!form.username || form.username.length < 2 || form.username.length > 20){
            errors.push("Username must be between 2 and 20 characters long");
        }
        if(!form.email || form.email.length < 1){
            errors.push("Please fill in email");
        }
        if(!password || password.length < 1){
            errors.push("Please fill in password");
        }
        return errors;
    }

    async function saveUser(userData){
        let imgUrl = defaultProfilePic;
        if(file){
            let x = await saveImg(file);
            if(x)
                imgUrl = x;
        }
        
        saveUserFirestore(userData, imgUrl);
    }

    async function saveImg(file: File): Promise<string | void>{
        const videoRef = storageRef.child(`/profilePictures/${file.name}`);
        const uploadTask = videoRef.put(file);
        await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onProgress, onError, onComplete);

        function onProgress(snapshot){
            let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(temp);
        }

        async function onComplete(){
            let url: string = await uploadTask.snapshot.ref.getDownloadURL();
            setProgress(0);

            return url;
        }

        function onError(e: Error) {
            setError([...errorMsg, e.message])
            return null;
        }
    }

    async function saveUserFirestore(userData, img){
        if(userData && userData.user){
            const usr = userData.user;
            db.collection('users').doc(usr.uid).set({
                username: form.username,
                email: usr.email,
                img
            })
            .catch((e: Error)=>{
                setError([...errorMsg, e.message]);
            })
        }
    }
    async function login(){
        await auth.signInWithEmailAndPassword(form.email, password)
        .then(()=>{
            router.push('/');
        })
        .catch((error) => {
            // Handle Errors here.
            var errorMessage = error.message;
            setError([...errorMsg, errorMessage]);
        });
    }

    async function register(){
        const userData = await auth.createUserWithEmailAndPassword(form.email, password)
        .catch((error: Error) => {
            // Handle Errors here.
            setError([...errorMsg, error.message]);
        });
        return userData;
    }

    
  return (
    <div>
        <form onSubmit={ e => {
          e.preventDefault();
          submit();
        }} >
            Username <input 
                type="text"
                value={form.username}
                onChange={(e)=>{
                    setForm({...form, username: e.target.value})
                }}
            /><br/>
            Email <input 
                type="email"
                value={form.email}
                onChange={(e)=>{
                    setForm({...form, email: e.target.value})
                }}
            /><br/>
            Password <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            Profile pic <FilePicker accept="image/*" onSelect={(d)=>onFileChange(d)} />
            { imgSrc && <ProfilePic src={imgSrc} size={150} /> }<br/>
            {
                errorMsg && errorMsg.length > 0 &&
                errorMsg.map((e: string, id)=>
                  <p key={id} className="error">{e}</p>
                )
            }
            <Button>Register</Button>
            <ProgressBar value={progress} />
        </form>
    </div>
  );
}

export default RegisterForm;