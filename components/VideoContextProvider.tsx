import React, { useState, useContext, createContext } from 'react';

const startingValues = {
    currentMS: 0,
    lengthMS:0,
    paused: true,
    speed: 1
}

const VideoContext = createContext<any | null >([null, null]);

export default function VideoContextProvider({ children }: any) {
    const [videoData, setVideoData] = useState(startingValues);

  return (
    <VideoContext.Provider value={[videoData, setVideoData]}>
        { children }
    </VideoContext.Provider>
  );
}
export const useVideoContext = () => useContext(VideoContext);