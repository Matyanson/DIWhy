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
    input: "",
    tools: []
  });
  const test = ()=>{
    
  }
  return (
    <div className="aboutPage">
        <Head>
          <title>About Page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Test />
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