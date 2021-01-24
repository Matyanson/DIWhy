import Head from 'next/head';
import MultiVideoPlayer from '../components/MultiVideoPlayer';
import Slider from '../components/Slider';
import SliderVertical from '../components/SliderVertical';
import Controls from '../components/VideoControls';
import HtmlVideoPlayer from '../components/HtmlVideoDisplay';
import Test from '../components/Test';
import VideoContextProvider from '../components/VideoContextProvider';
import { TimelineEdit } from '../components/TimelineEdit';

export default function About(props) {
  let value = "hello";
    return (
      <div className="aboutPage">
          <Head>
            <title>About Page</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Test />
          <VideoContextProvider >
            <Controls>
                <HtmlVideoPlayer url={'https://firebasestorage.googleapis.com/v0/b/diwhy-39b77.appspot.com/o/2020-10-07%2010-40-31.mkv?alt=media&token=86bf00e4-b9fe-4ce6-9257-5813b4533284'} />
            </Controls>
            <TimelineEdit editable={true} />
          </VideoContextProvider>
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