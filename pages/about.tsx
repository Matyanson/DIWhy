import Head from 'next/head';
import MultiVideoPlayer from '../components/MultiVieoPlayer';
import Test from '../components/Test';
import VideoContextProvider from '../components/VideoContextProvider';

export default function About(props) {
  let value = "hello";
    return (
      <div className="aboutPage">
          <Head>
            <title>About Page</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Test />
          <VideoContextProvider>
            <MultiVideoPlayer />
          </VideoContextProvider>
          <img className="icon" src="down-arrow.svg"/>
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