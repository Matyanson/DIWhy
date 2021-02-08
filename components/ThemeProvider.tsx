import React, { createContext, useContext, useState } from "react";
import templates from '../assets/templates';
import ColorTemplate from "../models/ColorTemplate";


const ThemeContext = createContext<[ColorTemplate, (key:string)=>void ]>(null);

export default function ThemeProvider({ children }){
    const [ theme, setTheme ] = useState<ColorTemplate>(templates.light);
    const setThemeByKey = (key: string) =>{
        if(!templates[key])
            setTheme(templates["light"]);
        else
            setTheme(templates[key]);
    }
    return(
        <ThemeContext.Provider value={[theme, setThemeByKey]}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);