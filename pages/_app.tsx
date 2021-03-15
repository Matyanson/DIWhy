import AuthProvider from '../components/UserProvider';
import ThemeProvider from '../components/ThemeProvider';
import App from 'next/app';
import nookies from 'nookies';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { useState } from 'react';



function MyApp({ Component, pageProps, user, userData}) {
  const initTheme = userData?.currTheme ?? null;
  return (
    
    <AuthProvider initialUser={user}>
      <ThemeProvider initialTheme={ initTheme }>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ThemeProvider>
    </AuthProvider>
  )
  
}


MyApp.getInitialProps = async (appContext) => {
  
  const ctx = appContext.ctx;
  const appProps = await App.getInitialProps(appContext);
  
  const { token } = nookies.get(ctx);


  if(token && ctx.req){
    try {
      // USE NEXT API:
      const dev = process.env.NODE_ENV === 'development';
      const server = dev ? 'http://localhost:3000/' : 'https://diwhy.vercel.app/';
      const headers = {
        'Context-Type': 'application/json',
        Authorization: JSON.stringify({ token: token }),
      };
      const result = await fetch(`${server}api/validate`, { headers })
      .then((res) => res.json());

      //add user data to Redux
        return {...appProps, ...result };
    } catch (e) {
      console.log("error1:");
      console.log(e);
    } 
  }
  return { ...appProps };
  
};

export default MyApp
