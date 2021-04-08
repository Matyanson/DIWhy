import React, { useContext } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import { useTheme } from './ThemeProvider';
const Layout = ({children})=>{
    const [ theme ] = useTheme();
    const { primary, background, neutral, neutral_dark, text, secondary, allert } = theme;
    return (
        <>
        <Head>
          <link rel="icon" href="/logo.svg" />
        </Head>
            <Navbar />
            {children}
            <style>{`
                /*----Global----*/
                body, html{
                    background: ${background};
                    color: ${text};
                }
                h1, h2, h3{
                    color: ${secondary};
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
                input {
                    width: 100%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    display: inline-block;
                    background: ${neutral_dark};
                    color: ${text};
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