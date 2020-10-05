import Head from 'next/head';
import Uploader from '../components/Uploader';

export default function Upload() {
    return (
      <div>
         <Head>
            <title>Upload Page</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          Upload some Videos :)
          <Uploader/>
      </div>
    )
  }