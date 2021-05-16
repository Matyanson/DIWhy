import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Video from './VideoMiniature';
import IVideo from '../models/Video';
import firebase from 'firebase';

type IVideoID = IVideo&{id:string}

interface Props {
    queryStr?: string,
    chanelId?: string,
    publicOnly?: boolean,
    tools?: string[],
    material?: string[],
    limit?: number,
}

const VideoList = ({
    queryStr = "",
    chanelId = "",
    publicOnly = true,
    tools = [],
    material = [],
    limit = 15
}: Props)=> {
    let query: firebase.firestore.Query = db.collection('videos');

    if(publicOnly)
        query = query.where('public', '==', true)

    if(chanelId && chanelId != "")
        query = query.where('author.userId', '==', chanelId)
        
    if(queryStr && queryStr != ""){
        query = query
        .where('casefold', '>=', queryStr)
        .where('casefold', '<', queryStr+'z')
    } else {
        query = query
        .orderBy('timestamp', 'desc')
    }

    if(tools.length > 0)
        query = query.where('tools', 'array-contains-any', tools.slice(0, 10));
    else if(material.length > 0)
        query = query.where('material', 'array-contains-any', material.slice(0, 10));

    query = query
    .limit(limit);
    console.log(query);

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