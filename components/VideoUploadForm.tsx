import React, { useContext, useState } from 'react';
import Video from '../models/Video';
import { useAuth } from './UserProvider';
import { useRouter } from 'next/router';
import * as firebase from 'firebase/app';
import { db, storage } from '../firebase';
import FilePicker from './FilePicker';
import DBSelect from './DBTagSelect';
import Progressbar from './Progressbar';
import DBAdd from './DBAdd';
import { TimelineEdit } from './TimelineEdit/index';
import { useTheme } from './ThemeProvider';
import VideoPlayer from './HtmlVideoDisplay';
import VideoControls from './VideoControls';
import VideoContextProvider from './VideoContextProvider';


const Uploader = ()=> {
    const [form, setForm] = useState({
        title: "",
        public: false,
        tools: [],
        material: [],
        steps: []
    });
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const user = useAuth();
    const router = useRouter();
    let storageRef = storage.ref();


    function onFileChange(files){
        const newFiles = files.map(f=>{
            f.url = URL.createObjectURL(f);
            return f;
        })
        console.log(newFiles);
        setFiles(newFiles);
    }

    function submit(){
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
                console.log(url, videoTitle, username, uid);
                saveVideoToDatabase(url, videoTitle, username, uid);
                router.push('/');
            }
        }
    }
    function validate(){
        let result = true;
        if(!files || files.length == 0){
            setErrorMsg("select video file");
            result = false;
        }
        if(!user){
            setErrorMsg("Please log in!");
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
            material: form.material,
            steps: form.steps
        }
        console.log(video);
        db.collection("videos").add(video);
    }
    function test(){
        console.log(form);
    }
  return (
    <div className="Test">
        {
            !files &&
            <FilePicker accept="video/*" multiple={true} onSelect={(data)=>{onFileChange(data)}} />
        }
        {
            files && files[0] &&
            <VideoContextProvider>
                <VideoControls>
                    <VideoPlayer url={files[0].url} />
                </VideoControls>
                
                Title <input type="text" value={form.title} onChange={(e)=>{setForm({...form, title: e.target.value})}}/>
                Public <input type="checkbox" checked={form.public} onChange={()=>setForm({...form, public: !form.public})} />
                <div className="selects">
                    <div>
                        <h4>Tools</h4>
                        <DBSelect onChange={(d)=>setForm({...form, tools: d.map(x=>x.id)})} displayTextKey={"name"} collectionPath={"tools"}/>
                        <DBAdd collectionPath="tools"/>
                    </div>
                    <div>
                        <h4>Material</h4>
                        <DBSelect onChange={(d)=>setForm({...form, material: d.map(x=>x.id)})} displayTextKey={"name"} collectionPath={"material"}/>
                        <DBAdd collectionPath="material" />
                    </div>
                </div>
                <TimelineEdit editable={true} onChange={(steps)=>{setForm({...form, steps: steps})}} />
                <button onClick={()=>submit()}>Send</button>
                <button onClick={()=>test()}>test</button>
                <Progressbar value={progress} />
            </VideoContextProvider>
        }
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