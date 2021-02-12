import { ReactDOM, useState } from 'react';
import styled from 'styled-components'
import { useTheme } from '../ThemeProvider';

interface Props {
    label?: string
}


const InputComp = ({label = "" , ...rest}: Props & React.InputHTMLAttributes<HTMLInputElement>) =>{

    const [colors] = useTheme();
    
    return (
    <div className="group">      
        <input type="text" {...rest} required/>
        <span className="bar"></span>
        <label>{label}</label>

        <style jsx>{`
        .group{ 
            position:relative; 
            margin-bottom:45px; 
        }
        input 				{
            font-size:18px;
            padding:15px 10px 10px 5px;
            display:block;
            width:100%;
            background: none;
            outline:none;
            border:none;
            border-radius: 0;
            border-bottom:1px solid #757575;
        }
        .bar{
            position: absolute;
            height: 2px;
            width: 0px;
            background: ${colors.primary};
            bottom:0;
            left:0;
            transition: all .3s;
        }
        /*active state*/
        input:focus ~ .bar{
            width: 100%;
        }
        input:focus ~ label, input:valid ~ label {
            top: -7px;
            font-size:14px;
            color:${colors.primary};
        }
        label{
            position: absolute;
            top: 10px;
            left: 5px;
            font-size: 18px;
            color: #757575;
            font-weight: normal;
            pointer-events: none;
            transition: all .3s;
        }
        `}</style>
    </div>
    );
}
export default InputComp;