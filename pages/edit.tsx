import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import HtmlVideoPlayer from "../components/HtmlVideoDisplay";
import Controls from '../components/VideoControls'; 
import VideoContextProvider from '../components/VideoContextProvider';
import { TimelineEdit } from "../components/TimelineEdit";
import { useRouter } from 'next/router';
import { db, storage } from '../firebase';
import { useDocumentData, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import VideoList from '../components/VideoList';
import { isString } from 'util';
import { useAuth } from '../components/UserProvider';
import Video from '../models/Video';
import VideoEditForm from '../components/VideoEditForm';
import Step from '../models/Step';
import Button from '../components/styled/Button';
import { Trash } from '../components/icons';
import ModalBox from '../components/ModalBox';


interface VideoForm {
  title: string,
  public: boolean,
  tools: string[],
  material: string[],
  steps: Step[]
}

const Edit = ()=> {
  //get parameters from URL
  const user = useAuth();
  const router = useRouter();
  const vid: string = Array.isArray(router.query.v) ? router.query.v[0] : (router.query.v ?? '');
    
  //fetch video data
  const videoRef = vid ? db.collection('videos').doc(vid) : null;
  const [video] = videoRef ? useDocumentData<Video>(videoRef) : [null];
  
  //hooks
  const defaultForm: VideoForm = {
    title: "",
    public: true,
    tools: [],
    material: [],
    steps: []
  }
  const [form, setForm] = useState(defaultForm);
  const [modalBox, setModalBox] = useState(false);
  const initForm = useMemo(()=>{
    if(!video)
      return defaultForm;
    return Object.assign(defaultForm, video);
  }, [video])

  //functions
  const videoDataToForm = () => {
    if(!video)
      return defaultForm;
    return Object.assign(defaultForm, video);
  }
  const test = () =>{
    console.log(form);
    console.log(video);
  }
  
  const saveToDB = () =>{
    try{
      const collectionRef = db.collection('videos');
      collectionRef.doc(vid).update(form)
      .then(() => {
          console.log("Document successfully updated!");
          router.back();
      })
      console.log("submited");
    } catch(e){
      console.log(e);
    }
  }
  

  const deleteStoregeVideo = () =>{
    try{
      const videoRef =  storage.refFromURL(video.url);
      videoRef.delete()
      .then(()=>{
        console.log("Video deleted succesfully");
      })
    } catch(e){
      console.log(e);
    }
  }

  const deleteVideo = () =>{
    console.log("deleting");
    try{
      deleteStoregeVideo();
      const collectionRef = db.collection('videos');
      collectionRef.doc(vid).delete()
      .then(() => {
          console.log("Document successfully deleted!");
          router.back();
      })
    } catch(e){
      console.log(e);
    }
  }

  const submit = () =>{
    saveToDB();
  }
        
  return (
    <div>
        <Head>
            <title>Edit video</title>
        </Head>
        <h1>Edit Video</h1>
        {
          !vid &&
          <h2>Video Not Found</h2>
        }
        {
          !video && vid &&
          <h2>Loading or Permission denied</h2>
        }
        {
          !user &&
          <h2>Login first</h2>
        }
        {
          user && video && video.author && video.author.userId == user.uid && video.url &&
          <div className="container">
            {
              modalBox &&
              <ModalBox title={"Do you want to delete this video?"} onAction={(res)=>{
                setModalBox(false);
                if(res == true)
                  deleteVideo();
              }}/>
            }
            <VideoEditForm url={video.url} initialForm={initForm} onChange={(data)=>{setForm(data)}}/>
            <div className="buttons">
              {/* <Button onClick={()=>test()}>Test</Button>&nbsp;&nbsp;&nbsp;&nbsp; */}
              <Button onClick={()=>submit()}>Submit</Button>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button onClick={()=>setModalBox(true)}><Trash/></Button>
            </div>
          </div>
        }
    </div>
  );
}

export default Edit;