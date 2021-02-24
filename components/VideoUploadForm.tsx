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
import { DownArrow } from './icons';
import Input from './styled/Input';
import Button from './styled/Button';
import FloatWrap from './FloatWrap';
import Checkbox from './styled/Checkbox';
import ExpandWrap from './ExpandWrap';


const Uploader = ()=> {
    const [form, setForm] = useState({
        title: "",
        public: true,
        tools: [],
        material: [],
        steps: []
    });
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState(null);
    const [errorMsg, setErrorMsg] = useState<string>(null);
    const [hidden, setHidden] = useState(true);
    const [theme] = useTheme();
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
            setErrorMsg(error.message);
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
        const fileSizeLimit = 200 * 1000 * 1000; //200
        let result = true;
        if(!user){
            setErrorMsg("Please log in!");
            result = false;
        }
        if(!files || files.length < 1){
            setErrorMsg("select video file");
            result = false;
        }
        else if(files[0].size > fileSizeLimit){
            setErrorMsg(`File needs to be smaller than 200MB, ${Math.floor(files[0].size /1000000)}MB > 200MB`);
            result = false;
        }
        else if(files[0].type.match("video.*") == null){
            setErrorMsg('type of file selected is not a video');
            result = false;
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
        validate();
    }
  return (
    <div>
        {
            !files &&
            <FilePicker  accept="video/*" multiple={true} onSelect={(data)=>{onFileChange(data)}} />
        }
        {
            files && files[0] &&
            <VideoContextProvider>
            <div className="formWrap">
                <div className="left">
                    <div className="vidPlayer">
                        <VideoControls>
                            <VideoPlayer url={files[0].url} />
                        </VideoControls>    
                    </div>
                    <Input type="text" label="Title of the video" value={form.title} onChange={(e)=>{setForm({...form, title: e.target.value})}} />
                    Public <Checkbox checked={form.public} onChange={()=>{setForm({...form, public: !form.public}); console.log("check")}} />
                    <div className="tags">
                        <div className="select">
                            <div className="column">
                                <h4>Tools</h4>
                                <DBSelect onChange={(d)=>setForm({...form, tools: d.map(x=>x.id)})} displayTextKey={"name"} collectionPath={"tools"}/>

                            </div>
                            <div className="column">
                                <h4>Material</h4>
                                <DBSelect onChange={(d)=>setForm({...form, material: d.map(x=>x.id)})} displayTextKey={"name"} collectionPath={"material"}/>
                            </div>
                        </div>
                        <ExpandWrap label={"can't find your tag? create new!"}>
                        <div className="add">
                            <div className="column">
                                <DBAdd collectionPath="tools"/>
                            </div>
                            <div className="column">
                                <DBAdd collectionPath="material" />
                            </div>
                        </div>                          
                        </ExpandWrap>
                    </div>
                </div>
                <div className="right">
                    <TimelineEdit editable={true} onChange={(steps)=>{setForm({...form, steps: steps})}} />
                </div>
            </div>
            <Button onClick={()=>submit()}>Send</Button>
            <Button onClick={()=>test()}>test</Button>
            <Progressbar value={progress} />
            </VideoContextProvider>
        }
        {
            errorMsg &&
            <p className="error">{errorMsg}</p>
        }
        <style jsx>{`
            .formWrap{
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                margin: 5px 0;
            }
            .vidPlayer{
                position: sticky;
                top: 40px;
                z-index: 10;
                width: 100%;
                max-width: 600px;
                height: auto;
                /*max-height: 50vh;*/
            }
            .left, .right{
                margin: 5px;
            }
            .tags{
                display: flex;
                flex-flow: column;
                justify-content: start;
            }
            .tags .select, .tags .add{
                width: auto;
                display: flex;
                flex-flow: row wrap;
                justify-content: start;
            }
            .tags .addEdge{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
            }
            .tags .addEdge .line{
                height: 1px;
                width: auto;
                flex: 1;
                margin: auto 5px;
                background: ${theme.text};
            }
            .tags .addEdge .arrow{
                padding: 2px;
                fill: ${theme.text};
            }
            .tags .hidden{
                height: 0px;
                overflow: hidden;
            }
            .column{
                display: flex;
                flex-flow: column;
                justify-content: left;

                padding: 5px;
                max-width: 200px;
            }
            input[type=text]{
                padding: 7px;
                font-size: 1.2rem;
            }
            `}</style>
    </div>
  );
}

export default Uploader;