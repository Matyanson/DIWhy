import Step from './Step';
import IStep from '../../models/Step';
import { useTimelineProvider } from './TimelineProvider';
import { useVideoContext } from '../VideoContextProvider';
import { useTheme } from '../ThemeProvider';
import { Plus } from '../icons/index';
import { useMemo } from 'react';
import Test from '../Test';

interface Props{
    editable?: boolean
}

const defaultStepValue = {
    start:1000,
    title: "",
    description: ""
}

const StepsContainer = ({editable = false}: Props) => {
    const [theme] = useTheme();
    const [steps, setStepByIndex, setSteps, {getStepEnd, isStepActive, msToPrecentage}] = useTimelineProvider();
    const [videoData, setVideoData] = useVideoContext();

    const test = ()=>{
        console.log(steps);
    }

    return (
        <div className="steps">
            {
                steps.map((step, index)=>
                    <Step
                        key={index}
                        active={isStepActive(index)}
                        number={index+1}
                        data={step}
                        editable={editable}
                        onChange={(d)=>{setStepByIndex(index, d)}}
                        onClick={()=>setVideoData({...videoData, setMS: step.start})}
                        onDelete={()=>{
                            console.log(steps);
                            let res = [...steps];
                            res.splice(index, 1);
                            console.log(res);
                            console.log(`${index} removed`);
                            setSteps(res);
                        }}
                    />
                )
            }
            {
                editable &&
                <div className="add" onClick={()=>
                    setSteps([...steps, 
                    Object.assign(defaultStepValue, { start: videoData.currentMS })
                ])}>
                    <Plus/>
                </div>
            }
            <button onClick={()=>test()}>Test</button>
            <style jsx >{`
            .steps{
                position: relative;
                min-height: 100%;
                margin-left: 10px;
            }
            .add{
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin: 5px;
                border: ${theme.primary} solid 2px;
                color: ${theme.primary};
                font-size: 1.5rem;
                font-weight: bold;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.2s;
            }
            .add:hover{
                background: ${theme.primary};
                color: ${theme.background};
            }
            `}</style>
        </div>
    );

}
export default StepsContainer;