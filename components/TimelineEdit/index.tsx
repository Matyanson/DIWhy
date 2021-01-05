import { useEffect, useState } from 'react';
import SliderVertical from '../SliderVertical';
import { useTheme } from '../ThemeProvider';
import { useVideoContext } from '../VideoContextProvider';
import Step from './Step';
import IStep from '../../models/Step';

interface Props{
}

const TimelineEdit = () => {
    const [theme] = useTheme();
    const [videoData, setVideoData] = useVideoContext();
    const [sliderValue, setSliderValue] = useState(videoData.currentMS);
    const [steps, setSteps] = useState<IStep[]>([{
        start:1000,
        title: "The First step",
        description: "blůavsdůkmdsk n§sdfkldng§k adsn knd d fs§afds "
    },
    {
        start:3000,
        title: "The Second step",
        description: "lall ala sll ala lsj saklfj kasnl la la ll ala explosion"
    }]);

    useEffect(()=>{
        setSliderValue(videoData.currentMS);
    }, [videoData.currentMS])

    function setTime(ms){
        setVideoData({ ...videoData, setMS: ms});
        //setSliderValue(ms);
    }
    return (
        <div className="wrap">
            <div className="scale"></div>
            <SliderVertical min={0} max={videoData.durationMS ?? 10000} value={sliderValue} onChange={(v)=>setTime(v)} inverted={true}/>
            <div className="steps">
                {
                    steps.map((step, index)=>
                        <Step active={index===0} number={index+1} data={step} />
                    )
                }
            </div>
            <style jsx>{`
                .scale{
                    height:80vh;
                    width:0px;
                }
                .wrap{
                    display: flex;
                    flex-flow: row nowrap;
                    height: 80vh;
                }
                .step{
                    background: #ccc;
                    border-radius: 7px;
                    overflow: hidden;
                    width:0%;
                    height:0%;
                }
                .step.active{
                    width: auto;
                    height: auto;
                }
                .step .head{
                    display: flex;
                }
                .step .title{
                    font-size: 1.3rem;
                    margin-left: 5px;
                }
                .step .number{
                    background: ${theme.primary};
                    color: ${theme.background};
                    font-size: 1.4rem;
                    font-weight: bold;
                    border-radius: 5px;
                    padding: 3px;
                }
                .step .body{
                    padding: 5px;
                }
            `}</style>
        </div>
    );
}

export {TimelineEdit as TimelineEdit};