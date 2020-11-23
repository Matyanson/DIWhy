import { useState } from 'react';
import { db } from '../firebase';
import { casefold } from '../helpers/functions';

interface Props {
    collectionPath: string,
    title?: string
}

const CreateTool = ({
    collectionPath,
    title = "Name"
})=> {
    const [ form, setForm ] = useState({
        name: "",
    })
    const [errorMsg, setErrorMsg] = useState(null);
    function setName(newName){
        setForm({...form, name: newName});
    }
    async function submit(){
        const id = casefold(form.name);
        if(await isValid(id)){
            db.collection(collectionPath).doc(id).set({
                name: form.name
            });
            setForm({
                name: ""
            });
        }
        console.log(id);
    }
    async function isValid(id){
        const matRef = db.collection(collectionPath).doc(id);
        const snap = await matRef.get();
        if(snap.exists){
            setErrorMsg('already exits');
            return false;
        }
        setErrorMsg(null);
        console.log("isValid");
        return true;
    }
    return (
        <div>
            <h3>Create some new {collectionPath}</h3>
            {title}: <input type="text" value={form.name} onChange={(e)=>setName(e.target.value)} />
            <button onClick={()=>submit()} >Add</button>
            {
                errorMsg &&
                <div className="error">
                    error: {errorMsg}
                </div>
            }
        <style jsx>{`
        `}</style>
        </div>
    );
}

export default CreateTool;