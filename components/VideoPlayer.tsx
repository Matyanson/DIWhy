import HtmlVideoPlayer from "./HtmlVideoPlayer";
import Controls from './VideoControls'; 
import VideoContextProvider from './VideoContextProvider';

interface Props{
    url: string
}

const VideoPlayer = ({url}:Props)=> {

    return (
        <div>
            <VideoContextProvider >
                <Controls>
                    <HtmlVideoPlayer url={url} />
                </Controls>
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