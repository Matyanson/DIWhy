import React, { useState } from 'react';
import HtmlVideoPlayer from "../components/HtmlVideoDisplay";
import Controls from '../components/VideoControls'; 
import VideoContextProvider from '../components/VideoContextProvider';
import { TimelineEdit } from "../components/TimelineEdit";
import { useRouter } from 'next/router';
import { db } from '../firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';




const Watch = ()=> {
    const router = useRouter();
    const vid = router.query.v;

    const videoRef = db.doc(`videos/${vid}`);
    const [videoData, loading, error] =  useDocumentDataOnce<any>(videoRef);
    
        
  return (
    <div>
        {
            videoData ?
            <VideoContextProvider >
            <>
                <div className="vid"> 
                    <Controls title={videoData.title}>
                        <HtmlVideoPlayer url={videoData.url} />
                    </Controls>
                </div>
                <h2>{videoData.title}</h2>
                <TimelineEdit editable={false} initialSteps={videoData.steps} />
            </>
            </VideoContextProvider>
            :
            <div className="loadingScreen">
                <h2>Loading Video</h2>
            </div>
        }
        <style jsx>{`
            .vid{
                max-width: 650px;
                height: auto;
                margin-bottom: 10px;
            }
        `}</style>
    </div>
  );
}

export default Watch;