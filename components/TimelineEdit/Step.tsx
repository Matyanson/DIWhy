import { useEffect, useState } from 'react';
import SliderVertical from '../SliderVertical';
import { useTheme } from '../ThemeProvider';
import { useVideoContext } from '../VideoContextProvider';
import IStep from '../../models/Step';
import { title } from 'process';

interface Props{
    data: IStep,
    number: number,
    active?: boolean
}

const Step = ({
    data,
    number,
    active = false
}: Props) => {
    const [theme] = useTheme();
    const [isActive, setIsActive] = useState(active);
    return (
        <>
            <div className={`step ${isActive ? 'active' : ''}`}>
                <div className="head">
                    <div className="number" onClick={()=>setIsActive(!isActive)}>{number}</div>
                    <div className="title">{data.title}</div>
                </div>
                <div className="body">
                    <div className="description">{data.description}</div>
                </div>
            </div>
            <style jsx>{`
                .step{
                    display: flex;
                    flex-flow: column;
                    align-items: start;
                    background: #cccccc00;
                    border-radius: 7px;
                    overflow: hidden;
                    width: fit-content;
                    height: fit-content;
                    transition: all 0.2s;
                }
                .step.active{
                    background: #ccccccff;
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
                .title{
                    font-size: 1.3rem;
                    color: ${theme.heading};
                    transition: all 0.2s;
                }
                .step.active .number{
                    border-bottom-right-radius: 7px;
                    border-top-left-radius: 7px;
                    border-top-right-radius:0px;
                    border-bottom-left-radius:0px;
                }
                .number{
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: ${theme.primary};
                    color: ${theme.background};
                    font-size: 1.4rem;
                    font-weight: bold;
                    min-width: 1.4em;
                    border-radius: 50%;
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