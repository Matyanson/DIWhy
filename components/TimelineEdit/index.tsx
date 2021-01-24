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
    initialSteps?: IStep[],
    editable?: boolean,
    onChange?: (steps:IStep[])=>void
}

const defaultSteps: IStep[] = [{
    start:1000,
    title: "The First step",
    description: "give more detail into this step"
}]

const TimelineEdit = ({
    initialSteps = defaultSteps,
    editable = false,
    onChange = ()=>{}
} : Props) => {
    const [theme] = useTheme();
    const [videoData, setVideoData] = useVideoContext();
    const [sliderValue, setSliderValue] = useState(videoData.currentMS);
    const [steps, setSteps] = useState<IStep[]>(initialSteps);

    useEffect(()=>{
        console.log("steps changed")
        onChange(steps);
    }, [steps])

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