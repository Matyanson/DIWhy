import { useEffect, useRef, useState } from 'react';
import SliderVertical from '../SliderVertical';
import { useTheme } from '../ThemeProvider';
import { useVideoContext } from '../VideoContextProvider';
import IStep from '../../models/Step';
import { title } from 'process';
import { Trash } from '../icons/index';

interface Props{
    data: IStep,
    number: number,
    active?: boolean,
    editable?: boolean,
    onChange?: (data: any)=>void,
    onClick?: ()=>void,
    onDelete?: ()=>void
}

const Step = ({
    data,
    number,
    active = false,
    editable = false,
    onChange = ()=>{},
    onClick = ()=>{},
    onDelete = ()=>{}
}: Props) => {
    const [theme] = useTheme();
    const [step, setStep] = useState(data);
    const loaded = useRef(false);

    useEffect(()=>{
        setStep(data);
    }, [data])

    const changeValue = (newValue) => {
        setStep(newValue);
        onChange(newValue);
    }

    return (
        <>
            <div className={`step ${active ? 'active' : ''}`}>
                <div className="head">
                    <div className="number" onClick={()=>onClick()} >{number}</div>
                    <div className="title">
                        { editable ? <input type="text" value={step.title} onChange={(e)=>changeValue({...step, title: e.target.value})} /> :
                        step.title }
                    </div>
                    { editable && <div className="delete button"><Trash onClick={()=>onDelete()} /></div>}
                </div>
                <div className="body">
                    <div className="description">
                        {editable ?
                        <input type="text" value={step.description} onChange={(e)=>changeValue({...step, description: e.target.value})} /> :
                        step.description}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .delete{
                    color: ${theme.allert};
                    margin: 10px;
                    border-radius: 50%;
                    padding: 5px;
                    width: 2em;
                    height: 2em;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .delete:hover{
                    background: ${theme.primary};
                    color: ${theme.background};
                }
                input{
                    margin:0;
                    padding: 5px;
                    background: transparent;
                }
                .step{
                    display: flex;
                    flex-flow: column;
                    align-items: start;
                    background: #cccccc00;
                    border-radius: 7px;
                    margin: 5px;
                    overflow: hidden;
                    width: fit-content;
                    height: fit-content;
                    transition: all 0.2s;
                }
                .step.active{
                    background: ${theme.neutral_dark};
                }
                .step.active .body{
                    padding: 7px;
                    max-height: 500px;
                }
                .step .head{
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                }
                .title{
                    margin: 0 5px;
                }
                .step .body{
                    padding: 0px;
                    max-height:0px;
                    overflow: hidden;
                    transition: all 0.2s;
                }
                .description, .description input{
                    color: ${theme.text};
                }
                .title, .title input{
                    font-size: 1.3rem;
                    color: ${theme.secondary};
                    transition: all 0.2s;
                }
                .step.active .number{
                    align-self: start;
                    border-bottom-right-radius: 7px;
                    border-top-left-radius: 7px;
                    border-top-right-radius:0px;
                    border-bottom-left-radius:0px;
                    background: ${theme.primary};
                    color: ${theme.background};
                }
                .number{
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: ${theme.primary} solid 2px;
                    color: ${theme.primary};
                    font-size: 1.4rem;
                    font-weight: bold;
                    min-width: 1.4em;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .number::before {
                    content: '';
                    float: left;
                    width: auto;
                    padding-bottom: 100%;
                }
                .hidden{
                    width:0px;
                    height:0px;
                    opacity:0;
                    transition: all 0.2s;
                }
            `}</style>
        </>
    );
}

export default Step;