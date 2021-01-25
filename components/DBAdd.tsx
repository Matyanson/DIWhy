import { useState } from 'react';
import { db } from '../firebase';
import { casefold } from '../helpers/functions';
import { Plus } from './icons';

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
            <h3>Create new {collectionPath}</h3>
            <div className="box">
                <input type="text" placeholder={`${title} of the ${collectionPath}`} value={form.name} onChange={(e)=>setName(e.target.value)} />
                <button onClick={()=>submit()} ><Plus/></button>
            </div>
            {
                errorMsg &&
                <div className="error">
                    error: {errorMsg}
                </div>
            }
        <style jsx>{`
            input[type=text]{
                margin:0;
                border-radius: 0;
            }
            button{
                border-radius: 0;
            }
            .box{
                display: flex;
                flex-flow: row;
                margin: 5px 0;
            }
        `}</style>
        </div>
    );
}

export default CreateTool;