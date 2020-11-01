import { useContext } from 'react';
import { useTheme } from './ThemeProvider';
const VideoList = (props)=> {
const { url, title } = props;
const [{ heading }] = useTheme();
    return (
        <div className="video">
            <video height="165"  controls>
            <source src={url} type="video/mp4"/>
            </video>
            <h3><a href={url}>{title}</a></h3>
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