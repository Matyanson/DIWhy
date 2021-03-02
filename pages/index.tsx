import Head from 'next/head';
import VideoList from '../components/VideoList';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar/>
      <Container>
        <h2>Current videos</h2>
        <VideoList limit={10}/>
      </Container>
    </div>
  )
}
