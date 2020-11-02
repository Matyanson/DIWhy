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
                }
                a{
                    color: ${primary};
                }

                input[type="file"]::-webkit-file-upload-button {
                    visibility: hidden;
                    display: none;
                }
                input[type="file"]{
                    content: 'Select some files';
                    display: inline-block;
                    border: 1px solid #999;
                    border-radius: 3px;
                    padding: 5px 8px;
                    outline: none;
                    white-space: nowrap;
                    -webkit-user-select: none;
                    cursor: pointer;
                    text-shadow: 1px 1px #fff;
                    font-weight: 700;
                    font-size: 10pt;
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