import { useVideoContext } from "./VideoContextProvider";
import { Play, Pause, Minimize, Maximize } from './icons';

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
                    <input type="range" min={0} max={1000} value={videoData.currentMS} onChange={(e)=>{setVideoData({...videoData, currentMS: e.target.value})}} ></input>
                    <div className="row-buttons">
                        <div className="playPause" onClick={()=>playPause()} >
                            {videoData.paused ? <Play /> : <Pause />}
                        </div>
                        <div className="fullscreen"><Maximize/></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .videoControls{
                    position: relative;
                    color: white;
                }
                .videoControls svg{
                    stroke: #fff;
                    fill: white,

                }
                .controls{
                    position: absolute;
                    background: #00FF0030;
                    width: 100%;
                    height: 100%;
                    top:0;
                    left:0;
                    padding: 5px;
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