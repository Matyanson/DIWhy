import templates from '../assets/templates.json';
import ThemeContext from './ThemeContext';
import { useContext } from 'react';

const SchemeSwitch = ()=>{
    const theme = useContext(ThemeContext);
    let templateList = Object.entries(templates);
    return (
        <div>
            {templateList.map(x=>{
                <button>{x[0]}</button>
            })}
            <style jsx >{`
                
            `}</style>
        </div>
    );
}

export default SchemeSwitch;