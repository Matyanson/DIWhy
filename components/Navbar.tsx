import Link from 'next/link';
import ThemeContext from './ThemeContext';
import { useContext } from 'react';
import { useAuth } from './UserContext';
const Navbar = ()=>{
    const { user } = useAuth();
    const theme = useContext(ThemeContext)
    console.log(theme);
    let email = user? user.email : "not signed in";
    return (
        <div>
            <ul className="nav">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/upload">Upload</Link></li>
                <li><Link href="/about">About</Link></li>
                <li>{email}</li>
            </ul>
            <style jsx >{`
                
            `}</style>
        </div>
    );
}

export default Navbar;