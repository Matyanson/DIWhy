import React, { createContext, useContext, useState } from "react";
import templates from '../assets/templates';


const ThemeContext = createContext(null);

export default function ThemeProvider({ children }){
    const [ theme, setTheme ] = useState(templates.light);
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