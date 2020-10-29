import templates from '../assets/templates.json';
import SchemeButton from './SchemeButton';
import ThemeContext from './ThemeContext';
import { useContext } from 'react';

const SchemeSwitch = ()=>{
    const [theme, setTheme] = useContext(ThemeContext);
    let templateList = Object.entries(templates);

    function changeTheme(key){
        if(templates[key])
            setTheme(templates[key]);
    }
    return (
        <div className="container">
            {templateList.map((x, index)=>{
                return <div key={index} onClick={()=>changeTheme(x[0])}><SchemeButton colors={x[1]} /></div>
            })}
            <style jsx >{`
                .container{
                    display: flex;
                    flex-flow: row;
                }
            `}</style>
        </div>
    );
}

export default SchemeSwitch;