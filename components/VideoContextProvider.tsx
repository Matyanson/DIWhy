import React, { useState, useContext, createContext, useMemo, useEffect } from 'react';

const defaultValues = {
    currentMS: 0,
    setMS:0,
    durationMS:0,
    paused: true,
    speed: 1,
    trimStart: null,
    trimEnd: null
}

const VideoContext = createContext<any | null >(null);

export default function VideoContextProvider({ children, startingValues = {} }: any) {
  const [videoData, setVideoData] = useState(Object.assign(defaultValues, startingValues));
  useEffect(()=>{
    setVideoData({...videoData, currentMS: videoData.setMS});
  },[videoData.setMS])
  
  return (
    <VideoContext.Provider value={[videoData, setVideoData]}>
        { children }
    </VideoContext.Provider>
  );
}
export const useVideoContext = () => useContext(VideoContext);