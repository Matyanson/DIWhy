import { useContext } from 'react';
import Navbar from './Navbar';
import { useTheme } from './ThemeProvider';
const Layout = ({children})=>{
    const [ theme ] = useTheme();
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
                    cursor: pointer;
                }
                a{
                    color: ${primary};
                }
                input[type=text] {
                    width: 100%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    display: inline-block;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                input::-webkit-file-upload-button {
                    visibility: hidden;
                    display: none;
                }

                /*--- custom classes ---*/
                .error{
                    color: ${allert};
                }
            `}</style>
        </>
    )
}
export default Layout;