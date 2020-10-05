import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';


const Messages = ()=> {
    const messagesRef = db.collection('messages');
    const query = messagesRef.limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    console.log(messages);

    return (
        <div className="Messages">
            {
                messages &&
                messages.map((msg:any,i)=>{
                    return <div className="message" key={i}>{msg.text}</div>
                })
            }
        </div>
    );
}

export default Messages;