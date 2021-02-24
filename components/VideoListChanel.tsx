import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Video from './VideoMiniature';


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
                    return <Video id={vid.id} videoData={vid} width={"280px"} height={"260px"} key={i} />
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