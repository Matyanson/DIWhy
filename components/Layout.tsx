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
                body{
                    background: ${background};
                }
            `}</style>
        </>
    )
}
export default Layout;