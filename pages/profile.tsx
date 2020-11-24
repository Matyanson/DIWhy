import Container from '../components/Container';
import Head from 'next/head';
import ProfilePic from '../components/ProfilePicture';
import { useAuth } from '../components/UserProvider';
import VideoListProfile from '../components/VideoListProfile';

export default function About(props) {
  const user = useAuth();
    return (
      <div>
          <Head>
            <title>{user.username}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Container>
            <h2>{user.username}</h2><br/>
            <ProfilePic src={user.img} size={150} /><br/>
            <VideoListProfile />
          </Container>
      </div>
    )
  }