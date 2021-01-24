import { useVideoContext } from "./VideoContextProvider";
import { Play, Pause, Minimize, Maximize } from './icons';
import { ReactChildren, ReactNode, useRef, useState } from "react";
import useFullscreenStatus from "./UseFullscreenStatus";
import {msToTimePattern} from '../helpers/functions';
import Slider from "./Slider";

interface Props{
    children: ReactNode,
    title?: string
}

const VideoControls = ({
    children,
    title = 'Some Video Title'
}:Props)=> {
    
const [videoData, setVideoData] = useVideoContext();
const controlsRef = useRef(null);
const [isFullscreen, switchFullscreen] = useFullscreenStatus(controlsRef);
const [mouseMoving, setMouseMoving] = useState(true);
const mouseTimer = useRef(null);

function playPause(){
    setVideoData({ ...videoData, paused: !videoData.paused })
}
function setTime(ms){
    setVideoData({...videoData, setMS: Number(ms)});
}
function setMouseMovement(){
    setMouseMoving(true);
    if(mouseTimer && mouseTimer.current)
        clearTimeout(mouseTimer.current);
    mouseTimer.current = setTimeout(()=>setMouseMoving(false),2000);
}

    return (
        <div ref={controlsRef} className={`videoControls`}>
            {children}
            <div className={`controls ${mouseMoving ? '' : 'hidden'}`} onMouseMove={()=>setMouseMovement()} onMouseLeave={()=>setMouseMoving(false)} >
                <div className="top">
                    {isFullscreen &&
                        <div className="title">
                            {title}
                        </div>
                    }
                </div>
                <div className="middle" onClick={()=>playPause()} ></div>
                <div className="bottom">
                    <Slider min={0} max={videoData.durationMS} value={videoData.currentMS} onChange={(n)=>{setTime(n)}}/>
                    <div className="row-buttons">
                        <div className="left row">
                            <div className="playPause click" onClick={()=>playPause()} >
                                {videoData.paused ? <Play/> : <Pause/>}
                            </div>
                            <div className="time">
                                {msToTimePattern(videoData.currentMS)} / {msToTimePattern(videoData.durationMS)}
                            </div>
                        </div>
                        <div className="right row">
                            <div className="maximize click" onClick={()=>switchFullscreen()}>
                                {isFullscreen ? <Minimize/> : <Maximize/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .click{
                    cursor: pointer;
                }
                .hidden{
                    opacity: 0%;
                    cursor: none;
                }
                .row{
                    display: flex;
                    flex-flow: row;
                    justify-content: center;
                    align-items: center;
                }
                .row > *{
                    margin: 0 5px;
                }
                .videoControls{
                    position: relative;
                    color: white;
                    background: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .videoControls svg{
                    stroke: #fff;
                    fill: white,
                }
                .controls{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top:0;
                    left:0;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-between;
                    align-items: stretch;
                    transition: all 0.2s;
                }
                .controls > .top{
                    padding: 5px;
                    background-image: linear-gradient(#000000B0, #00000000);
                }
                .controls > .middle{
                    flex:1;
                }
                .controls > .bottom{
                    display: flex;
                    flex-flow: column;
                    padding: 5px;
                    background-image: linear-gradient(#00000000, #000000B0)
                }
                .row-buttons{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    justify-content: space-between;
                }
                .top .title{
                    font-size: 1.5rem;
                    margin: 5px;
                }
                .bottom .maximize{
                    align-self: flex-end;
                }
                .bottom .time{
                    font-size: 0.7rem;
                }
            `}</style>
        </div>
    );
}

export default VideoControls;