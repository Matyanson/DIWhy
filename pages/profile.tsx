import Container from '../components/Container';
import Head from 'next/head';
import ProfilePic from '../components/ProfilePicture';
import { useAuth } from '../components/UserProvider';
import VideoListProfile from '../components/VideoListProfile';
import FilePickerWrapper from '../components/FilePickerWrapper';
import * as firebase from 'firebase/app';
import { db, auth, storage } from '../firebase';

export default function About(props) {
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
    let imgRef = storageRef.child(`/profilePictures/${imgFile.name}`);
    let uploadTask = imgRef.put(imgFile);
    await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onProgress, onError, onComplete);

    function onProgress(snapshot){
      let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(temp)
    }

    function onError(error){
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
          <Head>
            <title>{user.username}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Container>
            <h2>{user.username}</h2><br/>
            <FilePickerWrapper onSelect={(data)=>newImage(data)}>
              <ProfilePic src={user.img} size={150} />
            </FilePickerWrapper>
            <br/>
            <VideoListProfile />
          </Container>
      </div>
    )
  }