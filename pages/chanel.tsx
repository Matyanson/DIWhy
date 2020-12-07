import React, { useState } from 'react';
import Container from '../components/Container';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfilePicture from '../components/ProfilePicture';
import { db } from '../firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';



const Watch = ()=> {
    const router = useRouter();
    const uid = router.query.id;

    const userRef = db.doc(`users/${uid}`);
    const [userData, loading, error] =  useDocumentDataOnce<any>(userRef);
    
        
  return (
    <div>
        {
            userData ?
            <>
            <Head>
            <title>{userData.username}</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
              <h2>{userData.username}</h2><br/>
              <ProfilePicture src={userData.img} size={150} />
              <br/>
            </Container>
            </>
            :
            <div className="loadingScreen">
                <h2>Loading profile</h2>
            </div>
        }
    </div>
  );
}

export default Watch;