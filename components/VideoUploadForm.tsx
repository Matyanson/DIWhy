import React, { useContext, useState } from 'react';
import { useAuth } from './UserProvider';
import * as firebase from 'firebase/app';
import { db, storage } from '../firebase';
import FilePicker from './FilePicker';
import TagSelect from './TagSelect';
import Progressbar from './Progressbar';

const Uploader = ()=> {
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState(null);
    const [title, setTitle] = useState("");
    const [tools, setTools] = useState([]);
    const [material, setMaterial] = useState([]);
    const user = useAuth();
    let storageRef = storage.ref();
    const allTools = ["hammer", "ruller", "meter", "gluegun"];
    const allMaterial = ["paper", "acrilic plast", "pet bottle"];
    

    function submit(){
        console.log("submiting");
        console.log(files);
        console.log(tools);
        console.log(material);
        let videoTitle = title;
        if(!files || files.length == 0)
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
            console.log(error);
        }

        async function onComplete(){
            let url = await uploadTask.snapshot.ref.getDownloadURL();
            console.log(`File available at ${url}`);
            setProgress(0);
            let userData = await getUserData();
            if(userData){
                const { username } = userData;
                saveVideoToDatabase(url, videoTitle, username, user.uid);
            }
        }
    }

    function saveVideoToDatabase(url: string, title: string, username: string, userId: string){
        db.collection("videos").add({
            title,
            author: { username, userId },
            url,
            tools: tools,
            material: material
        })
    }

    async function getUserData(){
        if(!user)
            return null;
        const userId = user.uid;
        const userRef = await db.collection('users').doc(userId);
        const userSnapshot = await userRef.get();
        const userData = await userSnapshot.data();
        if(userData.email !== user.email)
            return null;
        return userData;
    }
  return (
    <div className="Test">
        <form onSubmit={ e => {
          e.preventDefault();
          submit();
        }} >
            Title <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <FilePicker onSelect={(data)=>{setFiles(data)}} />
            <div className="selects">
                <div>
                    <h4>Tools</h4>
                    <TagSelect items={allTools} onChange={(data)=>{setTools(data)}} />
                </div>
                <div>
                    <h4>Material</h4>
                    <TagSelect items={allMaterial} onChange={(data)=>{setMaterial(data)}} />
                </div>
            </div>
            <button>Send</button>
            <Progressbar value={progress} />
        </form>
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