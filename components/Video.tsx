import { useTheme } from './ThemeProvider';
import Video from '../models/Video';
import ProfilePic from './ProfilePicture';

interface Props{
    title: string,
    img?: string,
    uid: string,
    authorName: string,
    material?: string[],
    tools?: string[]
}

const VideoList = ({ 
    title,
    uid,
    authorName,
    material = [],
    tools = [],
    img = "https://firebasestorage.googleapis.com/v0/b/diwhy-39b77.appspot.com/o/default%2Fprofile.jpg?alt=media&token=9868229e-d8dd-48d7-9947-b08aa19d5043"
}: Props)=> {
const [{ heading }] = useTheme();
    return (
        <div className="video">
            <a href={`/watch?v=${uid}`}>
                <img src={'/video-thumbnail-default.png'} height="165" />
                <div>
                    <h3>{title}</h3>
                    <div className="row">{img && <><ProfilePic src={img} size={30}/>authorName</>}</div>
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
                .row{
                    display: flex;
                    flex-flow: row;
                }
            `}</style>
        </div>
    );
}

export default VideoList;