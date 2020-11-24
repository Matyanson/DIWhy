import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Video from './Video';


const VideoList = ()=> {
    const videosRef = db.collection('videos');
    const query = videosRef.limit(25);
    const [videos] = useCollectionData(query, { idField: 'id' });
    return (
        <div className="videoList">
                {videos &&
                videos.map((vid:any,i)=>{
                    const authorName = vid.author ? vid.author.username : "Anonymous";
                        return <Video key={i} authorName={authorName} title={vid.title} img={vid.img} uid={vid.id} />
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