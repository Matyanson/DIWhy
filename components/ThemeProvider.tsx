import React, { createContext, useContext, useEffect, useState } from "react";
import templates from '../assets/templates';
import ColorTemplate from "../models/ColorTemplate";
import styled, { ThemeProvider } from 'styled-components'
import { db } from "../firebase";
import { useAuth } from "./UserProvider";

//type Props = [ColorTemplate, (key:string)=>void, (theme:ColorTemplate)=>void ];

const ThemeContext = createContext<[ColorTemplate, (key:string)=>void]>(null);

export default function CustomThemeProvider({ children, initialTheme = null }){
    const user = useAuth();
    const [ theme, setTheme ] = useState<ColorTemplate>(initialTheme ?? templates.light);
    
    useEffect(()=>{
        const localTheme: ColorTemplate | null = JSON.parse(localStorage.getItem('theme'));
        if(localTheme)
            setTheme(localTheme);
    }, [])

    useEffect(()=>{
        if(user && user.theme){
            localStorage.setItem('theme', JSON.stringify(user.theme));
            setTheme(user.theme);
        }
    }, [user?.theme ?? null])

    const setThemeByKey = (key: string) =>{
        if(!templates[key])
            changeTheme(templates['light']);
        else
            changeTheme(templates[key]);
    }

    const changeTheme = (themeData: ColorTemplate) => {
        localStorage.setItem('theme', JSON.stringify(themeData));
        saveThemeToUser(themeData);
        setTheme(themeData);
    }

    const saveThemeToUser = (themeData: ColorTemplate) => {
        if(user && user.uid){
            try{
                const usrRef = db.collection('users').doc(user.uid);
                usrRef.update({
                    currTheme: themeData
                });
            } catch (e){
                console.log(e);
            }
        }
    }
    return(
        <ThemeContext.Provider value={[theme, setThemeByKey]}>
            <ThemeProvider theme={ theme }>
                { children }
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);