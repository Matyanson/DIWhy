import React, { useContext, useState } from 'react';
import Video from '../models/Video';
import { useAuth } from './UserProvider';
import { useRouter } from 'next/router';
import * as firebase from 'firebase/app';
import { db, storage } from '../firebase';
import FilePicker from './FilePicker';
import Progressbar from './Progressbar';
import DBAdd from './DBAdd';
import { TimelineEdit } from './TimelineEdit/index';
import { useTheme } from './ThemeProvider';
import VideoPlayer from './HtmlVideoDisplay';
import VideoControls from './VideoControls';
import VideoContextProvider from './VideoContextProvider';
import { DownArrow } from './icons';
import Input from './styled/Input';
import Button from './styled/Button';
import FloatWrap from './FloatWrap';
import Checkbox from './styled/Checkbox';
import ExpandWrap from './ExpandWrap';
import { casefold } from '../helpers/functions';
import VideoEditForm from './VideoEditForm';
import { firestore } from 'firebase-admin';


const Uploader = ()=> {
    const [form, setForm] = useState({
        title: "",
        public: true,
        tools: [],
        material: [],
        steps: []
    });
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState<(File&{url:string})[]>(null);
    const [errorMsg, setErrorMsg] = useState<string[]>([]);
    const [hidden, setHidden] = useState(true);
    const [theme] = useTheme();
    const user = useAuth();
    const router = useRouter();
    let storageRef = storage.ref();


    function onFileChange(files: File[]){
        const newFiles = files.map((f)=>{
            const url = URL.createObjectURL(f);
            return Object.assign(f, {url});
        })
        console.log(newFiles);
        setFiles(newFiles);
    }

    function submit(){
        let videoTitle = form.title;
        const errors = validate();
        setErrorMsg(errors);
        if(errors.length > 0)
            return;
        if(!user || !user.uid)
            return;

        const file = files[0];
        let videoRef = storageRef.child(`/uploadedVideos/${user.uid}/${Math.random()}${file.name}`);
        let uploadTask = videoRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onProgress, onError, onComplete);

        function onProgress(snapshot){
            let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(temp);
        }

        function onError(error){
            setErrorMsg([...errorMsg, error.message]);
        }

        async function onComplete(){
            let url = await uploadTask.snapshot.ref.getDownloadURL();
            setProgress(0);
            if(user){
                const { username, uid } = user;
                console.log(url, videoTitle, username, uid);
                saveVideoToDatabase(url, videoTitle, username, uid);
                router.back();
            }
        }
    }
    function validate(): string[]{
        const fileSizeLimit = 200 * 1000 * 1000; //200
        const errors = [];
        
        if(!user){
            errors.push("Please log in!");
        }
        if(!files || files.length < 1){
            errors.push("select video file");
        }
        else if(files[0].size > fileSizeLimit){
            errors.push(`File needs to be smaller than 200MB, ${Math.floor(files[0].size /1000000)}MB > 200MB`);
        }
        else if(files[0].type?.match("video.*") == null){
            errors.push('type of file selected is not a video');
        }
        return errors;
    }

    function saveVideoToDatabase(url: string, title: string, username: string, userId: string){
        const video: Video = {
            title,
            casefold: casefold(title),
            public: form.public,
            timestamp: Date.now(),
            author: { username, userId },
            url,
            tools: form.tools,
            material: form.material,
            steps: form.steps
        }
        console.log(video);
        db.collection("videos").add(video);
    }

    const test = ()=>{
        console.log(form);
    }
  return (
    <div>
        {
            !files &&
            <FilePicker  accept="video/*" multiple={true} onSelect={(data)=>{onFileChange(data)}} />
        }
        {
            files && files[0] &&
            <div>
                <VideoEditForm url={files[0].url} onChange={(formData)=>{setForm(formData)}} />
                <Button onClick={()=>submit()}>Upload</Button>
                <Button onClick={()=>test()}>Test</Button>
                <Progressbar value={progress} />
            </div>
        }
        {
            errorMsg && errorMsg.length > 0 &&
            errorMsg.map((e, id)=>
                <p key={id} className="error">{e}</p>
            )
        }
        <style jsx>{`
            
        `}</style>
    </div>
  );
}

export default Uploader;