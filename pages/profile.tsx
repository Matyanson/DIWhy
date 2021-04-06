import Container from '../components/Container';
import Head from 'next/head';
import ProfilePicChanger from '../components/ProfilePictureChanger';
import { useAuth } from '../components/UserProvider';
import VideoListChanel from '../components/VideoListChanel';
import * as firebase from 'firebase/app';
import { db, storage } from '../firebase';

export default function Profile(props) {
  const user = useAuth();
  const storageRef = storage.ref();

  function newImage(files){
    console.log("newImg")
    if(!files || !files[0])
      return;
    const img = files[0];
    uploadProfilePic(img);
  }

  async function uploadProfilePic(imgFile) {
    let imgRef = storageRef.child(`/profilePictures/${user.uid}/${Math.random()}${imgFile.name}`);
    let uploadTask = imgRef.put(imgFile);
    await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onProgress, onError, onComplete);

    function onProgress(snapshot){
      let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(temp)
    }

    function onError(error){
      console.log(error.message);
    }

    async function onComplete(){
      let url = await uploadTask.snapshot.ref.getDownloadURL();
      updateUserProfilePicUrl(url);
    }
  }
  async function updateUserProfilePicUrl(url) {
    const userDBRef =  db.collection('users').doc(user.uid);
    userDBRef.set({
      img: url
    },{ merge: true })
  }

    return (
      <div>
        { user &&
        <>
        <Head>
          <title>{user?.username || "loading..."}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <h2>{user.username}</h2><br/>
          <ProfilePicChanger size={150} onChange={(files)=>newImage(files)} />
          <br/>
          <h3>Your videos</h3>
          <VideoListChanel chanelId={user.uid} />
        </Container>
        </>
        }
          
      </div>
    )
  }