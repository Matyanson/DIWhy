import { useTheme } from './ThemeProvider';
import Tag from './Tag';
import ProfilePic from './ProfilePicture';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

interface Props{
    title: string,
    thumbnail?: string,
    profilePic?: string,
    id: string,
    authorId: string,
    authorName: string,
    material?: string[],
    tools?: string[]
}

const VideoList = ({ 
    title,
    id,
    authorName = "Anonymous",
    authorId,
    material = [],
    tools = [],
    profilePic = "https://firebasestorage.googleapis.com/v0/b/diwhy-39b77.appspot.com/o/default%2Fprofile.jpg?alt=media&token=9868229e-d8dd-48d7-9947-b08aa19d5043"
}: Props)=> {
const [{ heading }] = useTheme();
const authorRef = db.collection('users').doc(authorId);
const [author] = useDocumentData<any>(authorRef);
if(id == "RJodjqgmbRkSGADzHAzw")
    console.log(tools);
    return (
        <div className="video">
            <a href={`/watch?v=${id}`}>
                <img src={'/video-thumbnail-default.png'} height="165" />
                <h3>{title}</h3>
            </a>
            <div>
                {/* <div className="row">
                    { tools.map((x, key) => <Tag key={key} title={x} background="#2a64bd" />) }
                    { material.map((x, key) => <Tag key={-key} title={x} background="#c44d12" />) }
                </div> */}
                {author &&
                <a className="row" href={`/chanel?id=${authorId}`}>
                    <><ProfilePic src={author.img} size={30}/>{authorName}</>
                </a>
                }
                {!author &&
                <div className="row" >
                    <><ProfilePic src={profilePic} size={30}/>{authorName}</>
                </div>
                }
            </div>
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