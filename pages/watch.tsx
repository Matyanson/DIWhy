import React, { useState } from 'react';
import { useRouter } from 'next/router';
import VideoPlayer from '../components/VideoPlayer';
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
            <VideoPlayer title={videoData.title} url={videoData.url} />
            :
            <div className="loadingScreen">
                <h2>Loading Video</h2>
            </div>
        }
    </div>
  );
}

export default Watch;