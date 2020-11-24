import { useTheme } from './ThemeProvider';
import Video from '../models/Video';

interface Props{
    title: string,
    img?: string,
    uid: string,
    authorName: string,
    material?: string[],
    tools?: string[]
}

const VideoList = ({ title, uid, authorName, material = [], tools = [], img = undefined }: Props)=> {
const [{ heading }] = useTheme();
    return (
        <div className="video">
            <a href={`/watch?v=${uid}`}>
                <img src={'/video-thumbnail-default.png'} height="165" />
                <div>
                    <h3>{title}</h3>
                    <p>{authorName}</p>
                </div>                
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