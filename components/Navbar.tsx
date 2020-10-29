import Link from 'next/link';
import ThemeContext from './ThemeContext';
import { useContext } from 'react';
import { useAuth } from './UserContext';
import SchemeSwitch from './SchemeSwitch';
const Navbar = ()=>{
    const { user } = useAuth();
    const [ {background} ] = useContext(ThemeContext);
    let email = user? user.email : "not signed in";
    return (
        <div>
            <ul className="nav">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/upload">Upload</Link></li>
                <li><Link href="/about">About</Link></li>
                <li>{email}</li>
                <li><SchemeSwitch /></li>
            </ul>
            <style jsx >{`
                .nav{
                    background: linear-gradient(#557bc3, #1e4ba0);
                    box-shadow: 0px 2px 5px 0px #0000004f;
                    border-top-left-radius: 0px;
                    border-top-right-radius: 0px;
                    border-bottom-left-radius: 15px;
                    border-bottom-right-radius: 15px;
                    position: absolute;
                    margin: 0;
                    top:0;
                    left:0;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    justify-content: left;
                }
                ul.nav{
                    text-decoration: none;
                    list-style: none;
                }
                .nav li{
                    margin: 0 10px;
                    padding: 2px 5px;
                    background: #58a5e8;
                    color: #eee;
                    border-radius: 10px;
                    text-align: center;
                    vertical-align: center;
                }
            `}</style>
        </div>
    );
}

export default Navbar;