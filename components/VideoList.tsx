import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Video from './Video';


const VideoList = ()=> {
    const videosRef = db.collection('videos');
    const query = videosRef.limit(25);
    const [videos] = useCollectionData(query, { idField: 'id' });
    console.log(videos);

    return (
        <div className="videoList">
                {videos &&
                videos.map((vid:any,i)=>{
                    return <Video key={i} title={vid.title} url={vid.url} vid={vid.id} />
                })}
            <style jsx>{`
                .videoList{
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    justify-content: space-around;
                }
            `}</style>
        </div>
    );
}

export default VideoList;