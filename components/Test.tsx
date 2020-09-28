import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { db } from '../firebase';

const Test = ()=> {
    const [text, setText] = useState('text');
    function send(){
        db.collection("messages").add({text: text});
        setText('');
    }
  return (
    <div className="Test">
        <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
        <button onClick={()=>{send()}}>Send</button>
    </div>
  );
}

export default Test;