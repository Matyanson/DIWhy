import AuthProvider from '../components/UserProvider';
import ThemeProvider from '../components/ThemeProvider';
import templates from '../assets/templates.json';
import App from 'next/app';
import nookies from 'nookies';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { useState } from 'react';



function MyApp({ Component, pageProps, token, user}) {

  
  return (
    <ThemeProvider>
      <AuthProvider token={token}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
  
}


MyApp.getInitialProps = async (appContext) => {
  console.log("starting initial props");
  


  const ctx = appContext.ctx;
  const appProps = await App.getInitialProps(appContext);
  
  const { token } = nookies.get(ctx);


  if(token && ctx.req){
    try {
      // USE NEXT API NORMALY:
      const dev = process.env.NODE_ENV === 'development';
      const server = dev ? 'http://localhost:3000/' : 'https://diwhy.vercel.app/';
      const headers = {
        'Context-Type': 'application/json',
        Authorization: JSON.stringify({ token: token }),
      };
      const result = await fetch(`${server}api/validate`, { headers })
      .then((res) => res.json());

      //JUST IMPORT METHOD:
      // const validate = require('./api/validate2');
      // const result = await validate(token);
      //  console.log("result is:");
      //  console.log(result);
      console.log("yes");

      //add user data to Redux
        return {...appProps, user: result };
    } catch (e) {
      console.log("error1:");
      console.log(e);
    } 
  }
  return { ...appProps };
  
};

export default MyApp
