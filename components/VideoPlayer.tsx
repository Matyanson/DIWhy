import HtmlVideoPlayer from "./HtmlVideoDisplay";
import Controls from './VideoControls'; 
import VideoContextProvider from './VideoContextProvider';
import { TimelineEdit } from "./TimelineEdit";

interface Props{
    url: string,
    title?: string
}

const VideoPlayer = ({url, title = null}:Props)=> {

    return (
        <div>
            <VideoContextProvider >
                <Controls title={title}>
                    <HtmlVideoPlayer url={url} />
                </Controls>
                <TimelineEdit editable={false} initialSteps={} />
            </VideoContextProvider>
            <style jsx>{`
                .videoControls{
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    );
}

export default VideoPlayer;