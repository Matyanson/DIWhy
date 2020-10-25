import { auth } from '../firebase';

export default function Home() {
    async function submit(){
        console.log("ayaya");
        let username = "maty";
        let email = "test@poggers.com";
        let password = "test123";

        await auth.signInWithEmailAndPassword(email, password);
    }
    return (
      <div>
          <button onClick={()=>{submit()}}>
            Kiss x sis
          </button>
      </div>
    )
}