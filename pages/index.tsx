import Head from 'next/head'
import styles from '../styles/Home.module.css'
import VideoList from '../components/VideoList';
import LoginForm from '../components/LoginForm';
import { connect } from 'http2';

export default function Home(props) {
  console.log("Hello from HOME");
  console.log(props);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm/>
      
    </div>
  )
}
