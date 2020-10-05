import Head from 'next/head'
import styles from '../styles/Home.module.css'
import VideoList from '../components/VideoList';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      All videos:
      <VideoList/>
      
    </div>
  )
}
