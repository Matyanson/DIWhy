import React, { useState } from 'react';
import Head from 'next/head';
import HtmlVideoPlayer from "../components/HtmlVideoDisplay";
import Controls from '../components/VideoControls'; 
import VideoContextProvider from '../components/VideoContextProvider';
import { TimelineEdit } from "../components/TimelineEdit";
import { useRouter } from 'next/router';
import { db } from '../firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import VideoList from '../components/VideoList';




const Search = ()=> {
    const router = useRouter();
    const query: string = Array.isArray(router.query.q) ? router.query.q[0] : (router.query.q ?? '');
    const tools: string[] = [].concat(router.query.tools ?? []);
    const material: string[] = [].concat(router.query.material ?? []);
    console.log(query);
    console.log(tools);
    console.log(material);
    
        
  return (
    <div>
        <Head>
            <title>Search</title>
        </Head>
        <h1>Search</h1>
        <VideoList queryStr={query} tools={tools} material={material} />
    </div>
  );
}

export default Search;