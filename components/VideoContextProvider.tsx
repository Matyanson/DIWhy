import React, { useState, useContext, createContext, useMemo, useEffect } from 'react';

const defaultValues = {
    currentMS: 0,
    setMS:0,
    durationMS:0,
    paused: true,
    speed: 1,
    volume: 1,
    trimStart: null,
    trimEnd: null
}

interface Props {
  children: JSX.Element,
  startingValues?: typeof defaultValues | {}
}

export const VideoContext = createContext<any | null >(null);

export default function VideoContextProvider({ children, startingValues = {} }: Props) {
  const [videoData, setVideoData] = useState(Object.assign(defaultValues, startingValues));
  useEffect(()=>{
    setVideoData({...videoData, currentMS: videoData.setMS});
  },[videoData.setMS])
  
  return (
    <VideoContext.Provider value={[videoData, setVideoData] as const}>
        { children }
    </VideoContext.Provider>
  );
}
export const useVideoContext = () => useContext(VideoContext);