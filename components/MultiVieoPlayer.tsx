import { createRef, useEffect, useRef } from "react";
import VideoControls from './VideoControls';
import { useVideoContext } from './VideoContextProvider';

interface Props{
    url: string,
    width?: number,
    controls?: boolean
}

const MultiVideoPlayer = ({
    url,
    width = 650,
    controls = false,
} : Props ) => {


    return (
        <div className="video">
            <style jsx>{`
                .video{
                }
            `}</style>
        </div>
    );
}

export default MultiVideoPlayer;