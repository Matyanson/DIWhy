import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';


const VideoList = ()=> {
    const videosRef = db.collection('videos');
    const query = videosRef.limit(25);
    const [videos] = useCollectionData(query, { idField: 'id' });
    console.log(videos);

    return (
        <div className="videoList">
            {
                videos &&
                videos.map((vid:any,i)=>{
                    return (
                    <div className="videoHolder" key={i}>
                      <h3><a href={vid.url}>{vid.title}</a></h3>
                      <video width="320" height="240" controls>
                        <source src={vid.url} type="video/mp4"/>
                      </video>
                    </div>
                    )
                })
            }
        </div>
    );
}

export default VideoList;