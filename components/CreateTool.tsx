import { useRef, useState } from 'react';
import { db } from '../firebase';
import Container from './Container';
import { casefold } from '../helpers/functions';

const CreateTool = ()=> {
    const [ form, setForm ] = useState({
        name: "",
    })
    const [errorMsg, setErrorMsg] = useState();
    function setName(newName){
        setForm({...form, name: newName});
    }
    function submit(){
        const id = casefold(form.name);
        db.collection('tools').doc(id).set({
            name: form.name
        })
        console.log(id);
    }
    return (
        <div>
            <h3>Create some new tool</h3>
            Name: <input type="text" value={form.name} onChange={(e)=>setName(e.target.value)} />
            <button onClick={()=>submit()} >Submit</button>
        <style jsx>{`
        `}</style>
        </div>
    );
}

export default CreateTool;