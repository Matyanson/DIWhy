import { useContext } from 'react';
import { useTheme } from './ThemeProvider';
const VideoList = (props)=> {
const { url, title } = props;
const [{ heading }] = useTheme();
    return (
        <div className="video">
            <a href={url}>
                <img src={'/video-thumbnail-default.png'} height="165" />
                <h3>{title}</h3>
            </a>
            <style jsx>{`
                .video{
                    display: flex;
                    flex-flow: column;
                    align-items: left;
                    width: fit-content;
                    margin: 10px;
                }
                .video h3 a{
                    color: ${heading};
                }
            `}</style>
        </div>
    );
}

export default VideoList;