import { createContext, createRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import VideoControls from './VideoControls';
import VideoContextProvider, { useVideoContext, VideoContext } from './VideoContextProvider';
import HtmlVideoPlayer from './HtmlVideoDisplay';

interface Video{
    src: string,
    playerType: string,
    title: string
}

interface PlayerValues{
    currentMS: number,
    setMS: number,
    durationMS: number,
    paused: boolean,
    speed: number,
    trimStart?: number|null,
    trimEnd?: number|null
}

interface Props{
    videos?: Video[]
}

interface BlockProps{
    video: Video,
    videoIndex: number
}

//context
const MultiVideoContext = createContext(null);

const VideoBlock = ({
    video,
    videoIndex
} : BlockProps ) => {
    const [videoData, setVideoData] = useVideoContext(); //of this video
    const [videoDataList, setVideoDataList] = useContext(MultiVideoContext);
    const outerVideoData = useMemo(()=>videoDataList[videoIndex], [videoDataList]); //this video from outside
    return(
            <VideoControls>
                <HtmlVideoPlayer url={video.src}/>
            </VideoControls>
    )
}

const MultiVideoPlayer = ({
    videos = [
        {
            src: "https://firebasestorage.googleapis.com/v0/b/diwhy-39b77.appspot.com/o/2020-10-07%2010-40-31.mkv?alt=media&token=86bf00e4-b9fe-4ce6-9257-5813b4533284",
            playerType:"default",
            title: "Test1"
        },
        {
            src: "https://firebasestorage.googleapis.com/v0/b/diwhy-39b77.appspot.com/o/uploadedVideos%2F2.mp4?alt=media&token=c19928a2-3f2a-4858-a175-eb3b2af4b976",
            playerType:"default",
            title: "Darling in the FranXX S01E02"
        }
    ]
} : Props ) => {

    const [selected, setSelected] = useState(0);
    const [videoDataList, setVideoDataList] = useState<PlayerValues[]>(videos.map((v)=>VideoToPlayerValues(v)));
    const [videoData, setVideoData] = useVideoContext(); //outer

    useEffect(()=>{

    },[videoData.setMS])

    useEffect(()=>{
        console.log(videoDataList);
    },[videoDataList])

    function multipleToSinglePlayerData(videoList: Video[]){

    }

    function VideoToPlayerValues(video: Video){
        const res: PlayerValues = Object.assign({
            currentMS: 0,
            setMS: 0,
            durationMS: 0,
            paused: true,
            speed: 1,
        }, video);
        return res;
    }

    function onTest(){

    }

    function setVideoDataOfIndex(index, newData){
        setVideoDataList([
            ...videoDataList.slice(0, index),
            newData,
            ...videoDataList.slice(index)
        ])
    }

    return (
        <div className="wrap">
            <button onClick={onTest}>test</button>
            <MultiVideoContext.Provider value={[videoDataList, setVideoDataOfIndex]}>
            {
                videos.map((v, index) => {
                    return (
                    <VideoContextProvider key={index}>
                        <div className={`player ${index === selected || true ? 'selected' : ''}`}>
                            <VideoBlock video={v} videoIndex={index} />
                        </div>
                    </VideoContextProvider>
                    );
                })
            }
            </MultiVideoContext.Provider>
            <style jsx>{`
                .wrap{
                    position: relative;
                }
                .player{
                    display: none;
                }
                .selected{
                    display: block;
                }
            `}</style>
        </div>
    );
}

export default MultiVideoPlayer;