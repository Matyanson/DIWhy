import * as firebase from 'firebase/app';
import { db, storage } from '../firebase';
import FilePicker from './FilePicker';

const Uploader = ()=> {
    let files = null;
    let storageRef = storage.ref();
    function submit(){
        console.log("submiting");
        console.log(files);
        if(!files || files.length == 0)
            return;
        const file = files[0];
        let imagesRef = storageRef.child(`/${file.name}`);
        let uploadTask = imagesRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`progress is:\t${progress}`);
        },(error)=>{
            console.log(error);
        },async()=>{
            let url = await uploadTask.snapshot.ref.getDownloadURL();
            console.log(`File available at ${url}`);
        })

    }
  return (
    <div className="Test">
        <form onSubmit={ e => {
          e.preventDefault();
          submit();
        }} >
            <FilePicker changing={(data)=>{files = data}} />
            <button>Send</button>
        </form>
    </div>
  );
}

export default Uploader;