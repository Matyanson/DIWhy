import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Video from './VideoMiniature';


const VideoList = ({chanelId})=> {
    let query: firebase.firestore.Query = db.collection('videos');
    query = query
    .where('author.userId', '==', chanelId)
    .orderBy('timestamp')
    .limit(15);
    const [videos, loading, error] = useCollectionData(query, { idField: 'id' });

    useEffect(()=>{
        if(error)
            console.log(error);
    }, [error])
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