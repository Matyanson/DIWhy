import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Video from './VideoMiniature';
import IVideo from '../models/Video';

type IVideoID = IVideo&{id:string}

const VideoList = ()=> {
    const videosRef = db.collection('videos');
    const query = videosRef.orderBy('title').limit(15);
    const [videos] = useCollectionData<IVideoID>(query, { idField: 'id' });
    
    return (
        <div className="videoList">
                {videos &&
                videos.map((vid:IVideoID,i)=>{
                    return <Video id={vid.id} videoData={vid} width={"280px"} height={"260px"} key={i} />
                })}
            <style jsx>{`
                .videoList{
                    width: 100%;
                    display: flex;
                    flex-flow: row wrap;
                    align-items: start;
                    align-content: start;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
}

export default VideoList;