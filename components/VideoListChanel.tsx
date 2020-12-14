import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Video from './Video';


const VideoList = ({chanelId})=> {
    const videosRef = db.collection('videos');
    const query = videosRef
    .where('author.userId', '==', chanelId)
    .orderBy('title')
    .limit(25);
    const [videos] = useCollectionData(query, { idField: 'id' });
    return (
        <div className="videoList">
                {videos &&
                videos.map((vid:any,i)=>{
                    const authorName = vid.author ? vid.author.username : "Anonymous";
                    const authorId = vid.author ? vid.author.userId : "1";
                        return <Video key={i} authorName={authorName} title={vid.title} authorId={authorId} thumbnail={vid.img} id={vid.id} />
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