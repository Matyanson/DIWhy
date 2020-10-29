import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { db, storage } from '../firebase';
import FilePicker from './FilePicker';
import Progressbar from './Progressbar';

const Uploader = ()=> {
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    let files = null;
    let storageRef = storage.ref();

    function submit(){
        console.log("submiting");
        console.log(files);
        let videoTitle = title;
        if(!files || files.length == 0)
            return;
        const file = files[0];
        let videoRef = storageRef.child(`/uploadedVideos/${file.name}`);
        let uploadTask = videoRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
            let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(temp);
        },(error)=>{
            console.log(error);
        },async()=>{
            let url = await uploadTask.snapshot.ref.getDownloadURL();
            console.log(`File available at ${url}`);
            setProgress(0);
            saveVideoToDatabase(url, videoTitle);
        })
    }

    function saveVideoToDatabase(url: string, title: string){
        db.collection("videos").add({
            title,
            url
        })
    }
  return (
    <div className="Test">
        <form onSubmit={ e => {
          e.preventDefault();
          submit();
        }} >
            Title <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <FilePicker onSelect={(data)=>{files = data}} />
            <button>Send</button>
            <Progressbar value={progress} />
        </form>
    </div>
  );
}

export default Uploader;