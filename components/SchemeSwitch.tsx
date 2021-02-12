import templates from '../assets/templates';
import SchemeButton from './SchemeButton';
import { useTheme } from './ThemeProvider';

const SchemeSwitch = ()=>{
    const [theme, setTheme] = useTheme();
    let templateList = Object.entries(templates);

    return (
        <div className="container">
            {templateList.map((x, index)=>{
                return <div key={index} onClick={()=>setTheme(x[0])}><SchemeButton colors={x[1]} /></div>
            })}
            <style jsx >{`
                .container {
                    display: flex;
                    flex-flow: row;
                }
            `}</style>
        </div>
    );
}

export default SchemeSwitch;