import { createRef, useRef } from "react";
import { useVideoContext } from "./VideoContextProvider";

interface Props{
    children: any
}

const VideoControls = ({
    children
}:Props)=> {
    
const [videoData, setVideoData] = useVideoContext();

function playPause(){
    setVideoData({ ...videoData, paused: !videoData.paused })
}
    return (
        <div className="videoControls">
            {children}
            <div className="controls">
                <div className="top"></div>
                <div className="middle" onClick={()=>playPause()} ></div>
                <div className="bottom">
                    <input type="range" ></input>
                    <div className="row-buttons">
                        <button onClick={()=>playPause()} >{videoData.paused ? 'play' : 'pause'}</button>
                        <button>jen test</button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .videoControls{
                    position: relative;
                }
                .controls{
                    position: absolute;
                    background: #00FF0030;
                    width: 100%;
                    height: 100%;
                    top:0;
                    left:0;
                    
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-between;
                    align-items: stretch;
                }
                .controls > .middle{
                    flex:1;
                }
                .controls > .bottom{
                    display: flex;
                    flex-flow: column;
                }
                .row-buttons{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                }
            `}</style>
        </div>
    );
}

export default VideoControls;