import Head from 'next/head';
import UploadForm from '../components/VideoUploadForm';
import Container from '../components/Container';

export default function Upload() {
    return (
      <div>
         <Head>
            <title>Upload Page</title>
          </Head>
          <Container>
            <h2>Upload your video</h2>
            <UploadForm/>
          </Container>
      </div>
    )
  }