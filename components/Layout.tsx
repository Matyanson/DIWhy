import { useContext } from 'react';
import Navbar from './Navbar';
import ThemeContext from './ThemeContext';
const Layout = ({children})=>{
    const [theme] = useContext(ThemeContext);
    const { dark, primary, background, container, text, heading, allert } = theme;
    return (
        <>
            <Navbar />
            {children}
            <style>{`
                /*----Global----*/
                body, html{
                    background: ${background};
                    color: ${text};
                }
                h1, h2, h3{
                    color: ${heading};
                }
                button{
                    background: ${primary};
                    border: none;
                    color: ${background};
                    padding: 5px;
                    border-radius: 8px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    user-select: none;
                }
                a{
                    color: ${primary};
                }
            `}</style>
        </>
    )
}
export default Layout;