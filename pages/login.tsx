import Head from 'next/head';
import Container from '../components/Container';
import LoginForm from '../components/LoginForm';

export default function Upload() {
return (
    <div>
        <Head>
        <title>Upload Page</title>
        </Head>
        <Container>
        <h2>Login here</h2>
        <LoginForm/>
        </Container>
    </div>
    )
}