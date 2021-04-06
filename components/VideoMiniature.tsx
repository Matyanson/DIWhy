import { useTheme } from './ThemeProvider';
import Tag from './TagSelect/Tag';
import ProfilePic from './ProfilePicture';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import IVideo from '../models/Video';
import User from '../models/User';
import { Edit } from './icons/index';
import { useAuth } from './UserProvider';

interface Props{
    width?: string,
    height?: string,
    id,
    videoData: IVideo,
}
const defaultProfilePic = "https://firebasestorage.googleapis.com/v0/b/diwhy-39b77.appspot.com/o/default%2Fprofile.jpg?alt=media&token=9868229e-d8dd-48d7-9947-b08aa19d5043"

const VideoMiniature = ({ 
    width = "280px",
    height = "260px",
    id,
    videoData
}: Props)=> {
const [{ secondary }] = useTheme();
const user = useAuth();
const authorRef = videoData.author ? db.collection('users').doc(videoData.author.userId) : null;
const [author] = authorRef ? useDocumentData<User>(authorRef) : [null];

    return (
        <div className="video">
            <a href={`/watch?v=${id}`}>
                <img src={'/video-thumbnail-default.png'} height="165" />
                <h3>{videoData.title}</h3>
            </a>
            <div className="footer">
                {/* <div className="row">
                    { tools.map((x, key) => <Tag key={key} title={x} background="#2a64bd" />) }
                    { material.map((x, key) => <Tag key={-key} title={x} background="#c44d12" />) }
                </div> */}
                <div className="row">
                    {author && videoData.author &&
                    <>
                        <a className="row" href={`/chanel?id=${videoData.author.userId}`}>
                            <ProfilePic src={author.img} size={30}/>
                            {videoData.author.username}
                        </a>
                        <div className="end">
                            {user && user.uid == videoData.author.userId &&
                                <a href={`/edit?v=${id}`}><Edit/></a>
                            }
                        </div>
                    </>
                    }

                    {/* No UserData */}
                    {!author &&
                    <>
                        <div className="row">
                            <ProfilePic src={defaultProfilePic} size={30}/>
                            <div>{"Annonymous"}</div>
                        </div>
                        <div className="end">
                        </div>
                    </>
                    }
                </div>
            </div>
            <style jsx>{`
                .video{
                    display: flex;
                    flex-flow: column;
                    align-items: left;
                    width: ${width};
                    height: ${height};
                    margin: 5px 15px;
                    overflow: hidden;
                }
                .video h3 a{
                    color: ${secondary};
                }
                a, h1, h2, h3, h4, p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                img{
                    object-fit: cover;
                }
                .row{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                }
                .end{
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                }
            `}</style>
        </div>
    );
}

export default VideoMiniature;