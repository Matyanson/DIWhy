import AuthProvider from '../components/UserProvider';
import ThemeProvider from '../components/ThemeProvider';
import App from 'next/app';
import nookies from 'nookies';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import ColorTemplate from '../models/ColorTemplate';



function MyApp({ Component, pageProps, user, userData}) {
  
  let localTheme: ColorTemplate | null = null;
  if(typeof window !== 'undefined'){
    try{
      localTheme = JSON.parse(localStorage.getItem('theme'));
    }catch (e) {

    }
  }
  
  const initTheme: ColorTemplate | null = userData?.currTheme ?? localTheme;
  // console.log("initTheme _app", initTheme);
  // console.log("userData _app", userData);
  // console.log("user _app", user);
  return (
    
    <AuthProvider initialUser={user} initialUserData={userData}>
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
