import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Video from './VideoMiniature';
import IVideo from '../models/Video';
import firebase from 'firebase';

type IVideoID = IVideo&{id:string}
interface Props {
    queryStr?: string,
    limit?: number,
}

const VideoList = ({
    queryStr = "",
    limit = 15
}: Props)=> {
    let query: firebase.firestore.Query = db.collection('videos');
    query = query.where('public', '==', true)
    if(queryStr && queryStr != ""){
        query = query
        .where('title', '>=', queryStr)
        .where('title', '<', queryStr+'z')
    }
    query = query
    .orderBy('timestamp')
    .limit(limit);
    const [videos, loading, error] = useCollectionData<IVideoID>(query, { idField: 'id' });

    useEffect(()=>{
        if(error)
            console.log(error);
    }, [error])
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