import { useTheme } from '../ThemeProvider';
import Step from './Step';

interface Props{
    height?: number,
    top?: number,
    active?: boolean,
    onClick?: ()=>void
}

const SideBlock = ({
    height = 0,
    top = 0,
    active = false,
    onClick = ()=>{}
}:Props) => {
    const [theme] = useTheme();

    return (
        <div onClick={()=>onClick()} style={{top: `${top}%`, height:`${height}%`}} className={`block ${active ? 'active' : ''}`}>
            
            <style jsx >{`
            .block.active{
                background: ${theme.primary};
            }
            .block{
                position: absolute;
                width: 100%;
                left: 0;
                background: #77777777;
                opacity: 0.5;
                transition: background 0.2s, opacity 0.2s, width 0.1s;
            }
            .block:hover{
                width: 120%;
                opacity: 1;
            }
            `}</style>
        </div>
    );

}
export default SideBlock;