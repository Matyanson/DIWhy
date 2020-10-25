import AuthProvider, { useAuth } from '../components/UserContext';
import App from 'next/app';
import nookies from 'nookies';
import Layout from '../components/Layout';
//import validate from './api/validate';
import '../styles/globals.css';



function MyApp({ Component, pageProps, token, user}) {
  return (
    <AuthProvider token={token}>
      <Layout>
        <Component user={user} {...pageProps} />
      </Layout>
    </AuthProvider>
  )
  
}


MyApp.getInitialProps = async (appContext) => {
  console.log("starting initial props");
  


  const ctx = appContext.ctx;
  const appProps = await App.getInitialProps(appContext);
  
  const { token } = nookies.get(ctx);
  console.log(token);


  if(token && typeof window === "undefined" && !process.browser){
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
      console.log(result);
        return {...appProps, user: result };
    } catch (e) {
      console.log("error1:");
      console.log(e);
    } 
  }
  return { ...appProps };
  
};

export default MyApp
