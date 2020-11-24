import React, { useContext, useState } from 'react';
import Video from '../models/Video';
import { useAuth } from './UserProvider';
import * as firebase from 'firebase/app';
import { db, storage } from '../firebase';
import FilePicker from './FilePicker';
import DBSelect from './DBTagSelect';
import Progressbar from './Progressbar';
import DBAdd from './DBAdd';

const Uploader = ()=> {
    const [form, setForm] = useState({
        title: "",
        public: false,
        tools: [],
        material: []
    });
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const user = useAuth();
    let storageRef = storage.ref();
    

    function submit(){
        console.log(user);
        console.log(form);
        setErrorMsg(null);
        console.log("submiting");
        console.log(files);
        let videoTitle = form.title;
        if(!validate())
            return;

        const file = files[0];
        let videoRef = storageRef.child(`/uploadedVideos/${file.name}`);
        let uploadTask = videoRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onProgress, onError, onComplete);

        function onProgress(snapshot){
            let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(temp);
        }

        function onError(error){
            setErrorMsg(error);
        }

        async function onComplete(){
            let url = await uploadTask.snapshot.ref.getDownloadURL();
            setProgress(0);
            if(user){
                const { username, uid } = user;
                saveVideoToDatabase(url, videoTitle, username, uid);
            }
        }
    }
    function validate(){
        let result = true;
        if(!files || files.length == 0){
            setErrorMsg("select your file");
            result = false;
        }
        if(!user){
            setErrorMsg("Please log in!")
        }
        return result;
    }

    function saveVideoToDatabase(url: string, title: string, username: string, userId: string){
        const video: Video = {
            title,
            public: false,
            author: { username, userId },
            url,
            tools: form.tools,
            material: form.material
        }
        db.collection("videos").add(video);
    }
  return (
    <div className="Test">
            Title <input type="text" value={form.title} onChange={(e)=>{setForm({...form, title: e.target.value})}}/>
            Public <input type="checkbox" checked={form.public} onChange={()=>setForm({...form, public: !form.public})} />
            <FilePicker accept="video/*" onSelect={(data)=>{setFiles(data)}} />
            <div className="selects">
                <div>
                    <h4>Tools</h4>
                    <DBSelect onChange={(d)=>setForm({...form, tools: d})} displayTextKey={"name"} collectionPath={"tools"}/>
                    <DBAdd collectionPath="tools"/>
                </div>
                <div>
                    <h4>Material</h4>
                    <DBSelect onChange={(d)=>setForm({...form, material: d})} displayTextKey={"name"} collectionPath={"material"}/>
                    <DBAdd collectionPath="material" />
                </div>
            </div>
            <button onClick={()=>submit()}>Send</button>
            <Progressbar value={progress} />
            {
                errorMsg &&
                <p className="error">{errorMsg}</p>
            }
        <style jsx>{`
            .selects{
                display: flex;
                flex-flow: row;
            }
            `}</style>
    </div>
  );
}

export default Uploader;