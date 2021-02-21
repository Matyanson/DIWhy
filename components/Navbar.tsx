import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { useAuth } from './UserProvider';
import SchemeSwitch from './SchemeSwitch';
import { Router, useRouter } from 'next/router';
import ProfilePic from './ProfilePicture';

const Navbar = ()=>{
    const user = useAuth();
    const router = useRouter();
    const [ { background, nav_BG, nav_FG, text, primary, neutral, neutral_dark} ] = useTheme();
    return (
        <div>
            <ul className="nav">
                <li className={ router.pathname == "/" ? "active" : ""}>
                    <Link href="/"><a>Home</a></Link>
                </li>
                <li className={ router.pathname == "/upload" ? "active" : ""}>
                    <Link href="/upload"><a>Upload</a></Link>
                </li>
                <li className={ router.pathname == "/about" ? "active" : ""}>
                    <Link href="/about"><a>About</a></Link>
                </li>
                <li className={ router.pathname == "/register" ? "active" : ""}>
                    <Link href="/register"><a>Register</a></Link>
                </li>
                {
                    !user &&
                    <li className={ router.pathname == "/login" ? "active" : ""}>
                        <Link href="/login"><a>Login</a></Link>
                    </li>
                }
                {
                user &&
                <>
                    <li className={ router.pathname == "/logout" ? "active" : ""}>
                        <Link href="/logout"><a>Logout</a></Link>
                    </li>
                    <li className={ `${router.pathname == "/profile" ? "active" : ""}`}>
                        <Link href="/profile"><a className="row">
                            <ProfilePic src={user.img} size={25} />
                            <div>{user.username}</div>
                        </a></Link>
                    </li>
                </>
                }
                <li>
                    <SchemeSwitch />
                </li>
            </ul>
            
            <style jsx >{`
                .nav{
                    /*background: linear-gradient(#557bc3 , #557bc3 60%, #4f70af 60%, #4f70af 86%, #1e4ba0 86%, #1e4ba0 100% );*/
                    background: ${nav_BG};
                    box-shadow: 0px 2px 5px 0px #0000004f;
                    position: fixed;
                    overflow: hidden;
                    margin: 0;
                    top:0;
                    left:0;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    justify-content: left;
                    z-index:100;
                }
                ul.nav{
                    text-decoration: none;
                    list-style: none;
                }
                .nav li{
                    margin: 0 10px;
                    padding: 2px 5px;
                    color: ${nav_FG};
                    border-radius: 10px;
                    text-align: center;
                    vertical-align: center;
                }
                .nav li .row{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                }
                .nav a{
                    color: ${nav_FG};
                    transition: all 0.2s;
                }
                .nav a:hover{
                    color: ${primary};
                }
                .active a{
                    color: ${primary}!important;
                }
            `}</style>
        </div>
    );
}

export default Navbar;