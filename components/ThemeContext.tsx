import React, { createContext } from "react";
import templates from "../assets/templates.json";


const ThemeContext = createContext(templates.light);
export default ThemeContext;