import Head from 'next/head';
import Container from '../components/Container';
import RegisterForm from '../components/RegisterForm';

export default function Upload() {
return (
    <div>
        <Head>
        <title>Upload Page</title>
        </Head>
        <Container>
        <h2>Register here</h2>
        <RegisterForm />
        </Container>
    </div>
    )
}