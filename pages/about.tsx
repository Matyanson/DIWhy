import Head from 'next/head';
import MultiVideoPlayer from '../components/MultiVideoPlayer';
import Slider from '../components/Slider';
import SliderVertical from '../components/SliderVertical';
import Controls from '../components/VideoControls';
import HtmlVideoPlayer from '../components/HtmlVideoDisplay';
import Test from '../components/Test';
import VideoContextProvider from '../components/VideoContextProvider';
import { TimelineEdit } from '../components/TimelineEdit';
import React, { useState } from 'react';
import DBAdd from '../components/DBAdd';
import TagSelect from '../components/TagSelect/TagSelect';
import Button from '../components/styled/Button';
import Input from '../components/styled/Input';
import { db } from '../firebase';
import { firestore } from 'firebase-admin';
import ListItem from '../models/ListItem';
import DBTagSelect from '../components/TagSelect/DBTagSelect';
import useItemList from '../components/TagSelect/useItemList';
import { casefold } from '../helpers/functions';


export default function About(props) {
  const [form, setForm] = useState({
    input: "",
    tools: []
  });
  const idList = ["cock", "hodně sus", "hammer", "hammer2"];
  const [items, setItems] = useState<ListItem[]>(
    idList.map(x=>{
      return {id: x, label: x, selected: false};
    })
  );
  
  const [testVal, setTest] = useState(["test"]);

  const test = async()=>{
    // const query = await db.collection('videos').get();
    // let batch = db.batch();
    // query.docs.forEach(snap =>{
    //   const docRef = snap.ref;
    //   const data = snap.data();
    //   batch.update(docRef, { casefold: casefold(data.title)});
    // })
    // batch.commit().then(()=>{
    //   console.log("Updated all Docs succesfully! :O");
    // })
  }
  return (
    <div className="aboutPage">
        <Head>
          <title>About Page</title>
        </Head>
        <br/><br/><br/>
        <Test initValue={testVal}/>
        {/* <TagSelect 
          initItems={items}
          onChange={(newItems)=>{setItems(newItems)}}
        /> */}
        <DBTagSelect
          collectionPath={"tools"}
          displayTextKey={"name"}
          onChange={(d)=>{setItems(d)}}
          initItems={items}
        />
        <Button onClick={()=>{test()}} >test</Button>
        <style jsx>{`
          .aboutPage{
            width: 70vh;
          }
          .icon{
            fill: red;
          }
          `}</style>
    </div>
  )
}