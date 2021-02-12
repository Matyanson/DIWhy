import React, { createContext, useContext, useState } from "react";
import templates from '../assets/templates';
import ColorTemplate from "../models/ColorTemplate";
import styled, { ThemeProvider } from 'styled-components'


const ThemeContext = createContext<[ColorTemplate, (key:string)=>void ]>(null);

export default function CustomThemeProvider({ children }){
    const [ theme, setTheme ] = useState<ColorTemplate>(templates.light);
    const setThemeByKey = (key: string) =>{
        if(!templates[key])
            setTheme(templates["light"]);
        else
            setTheme(templates[key]);
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