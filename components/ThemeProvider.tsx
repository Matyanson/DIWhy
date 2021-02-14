import React, { createContext, useContext, useEffect, useState } from "react";
import templates from '../assets/templates';
import ColorTemplate from "../models/ColorTemplate";
import styled, { ThemeProvider } from 'styled-components'
import { db } from "../firebase";
import { useAuth } from "./UserProvider";

type Props = [ColorTemplate, (key:string)=>void, (theme:ColorTemplate)=>void ];

const ThemeContext = createContext<Props>(null);

export default function CustomThemeProvider({ children, initialTheme = null }){
    const user = useAuth();
    const [ theme, setTheme ] = useState<ColorTemplate>(initialTheme ?? templates.light);
    console.log(theme);

    const setThemeByKey = (key: string) =>{
        if(!templates[key])
            changeTheme(templates["light"]);
        else
            changeTheme(templates[key]);
    }

    const changeTheme = (themeData: ColorTemplate) => {
        saveThemeToUser(themeData);
        setTheme(themeData);
    }

    const saveThemeToUser = (themeData: ColorTemplate) => {
        if(user && user.uid){
            const usrRef = db.collection('users').doc(user.uid);
            usrRef.update({
                currTheme: themeData
            })
        }
    }
    return(
        <ThemeContext.Provider value={[theme, setThemeByKey, changeTheme]}>
            <ThemeProvider theme={ theme }>
                { children }
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);