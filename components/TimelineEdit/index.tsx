import { useEffect, useState } from 'react';
import SliderVertical from '../SliderVertical';
import { useTheme } from '../ThemeProvider';
import { useVideoContext } from '../VideoContextProvider';
import IStep from '../../models/Step';
import StepsContainer from './StepsContainer';
import TimelineProvider, { useTimelineProvider } from './TimelineProvider';
import SideMap from './SideMap';
import TimesContainer from './TimesContainer';

interface Props{
    editable?: boolean,
}

const initialSteps: IStep[] = [{
    start:1000,
    title: "The First step",
    description: "blůavsdůkmdsk n§sdfkldng§k adsn knd d fs§afds "
},
{
    start:3000,
    title: "The Second step",
    description: "lall ala sll ala lsj saklfj kasnl la la ll ala explosion"
}]

const TimelineEdit = ({editable = false} : Props) => {
    const [theme] = useTheme();
    const [videoData, setVideoData] = useVideoContext();
    const [sliderValue, setSliderValue] = useState(videoData.currentMS);
    const [steps, setSteps] = useState<IStep[]>([]);

    useEffect(()=>{
        setSliderValue(videoData.currentMS);
    }, [videoData.currentMS])

    function setTime(ms){
        setVideoData({ ...videoData, setMS: ms});
    }

    return (
        <div className="wrap">
        <TimelineProvider initialSteps={initialSteps} onChange={(steps)=>setSteps(steps)}>
            <div className="scale"></div>
            <TimesContainer />
            <SliderVertical min={0} max={videoData.durationMS ?? 10000} value={sliderValue} onChange={(v)=>setTime(v)} inverted={true}/>
            <SideMap />
            <StepsContainer editable={editable}/>
        </TimelineProvider> 
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
            `}</style>
        </div>
    );
}

export {TimelineEdit as TimelineEdit};