import Head from 'next/head';
import Test from '../components/Test';

export default function About() {
  let value = "hello";
    return (
      <div>
          <Head>
            <title>About Page</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          This page is very interesting
          <input value={value} onChange={(e)=>{value = e.target.value}} />
          <Test val={value}/>
      </div>
    )
  }