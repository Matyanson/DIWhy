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
import DBSelect from '../components/DBTagSelect';
import TagSelect from '../components/TagSelect';
import Button from '../components/styled/Button';
import Input from '../components/styled/Input';


export default function About(props) {
  const [form, setForm] = useState({
    input: ""
  });
  return (
    <div className="aboutPage">
        <Head>
          <title>About Page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Test />
        <Button>Styled Component Button!</Button>
        <Input value={form.input} onChange={(e)=>setForm({...form, input: e.target.value})} label={"nameee??"}/>
        <h4>Material</h4>
        <DBSelect displayTextKey={"name"} collectionPath={"material"} onChange={(selected)=>{setForm({...form, tools: selected.map(x=>x.id)})}} />
        <Button onClick={()=>{console.log(form)}} >test</Button>
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