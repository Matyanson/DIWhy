import React, { createContext, useContext, useState } from "react";
import templates from '../assets/templates.json';


const ThemeContext = createContext(null);

export default function ThemeProvider({ children }){
    const [ Theme, setTheme ] = useState(templates.light);

    return(
        <ThemeContext.Provider value={[Theme, setTheme]}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);