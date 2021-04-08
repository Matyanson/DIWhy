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
import { isString } from 'util';




const Search = ()=> {
    const router = useRouter();
    const query: string = Array.isArray(router.query.q) ? router.query.q[0] : (router.query.q ?? '');
    console.log(query);
    
        
  return (
    <div>
        <Head>
            <title>Search</title>
        </Head>
        <h1>Search</h1>
        <VideoList queryStr={query}/>
    </div>
  );
}

export default Search;