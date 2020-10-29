import Head from 'next/head'
import { auth } from '../firebase';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    auth.signOut();
    router.push('/');

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>LOGGING OUT</h1>
    </div>
  )
}