import Head from 'next/head';
import Test from '../components/Test';

export default function About(props) {
  console.log("about props");
  console.log(props);
  let value = "hello";
    return (
      <div>
          <Head>
            <title>About Page</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Test />
      </div>
    )
  }