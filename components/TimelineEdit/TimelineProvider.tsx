import { get } from 'https';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import IStep from '../../models/Step';
import { useVideoContext } from '../VideoContextProvider';

const TimelineContext =  createContext(null);

interface Props{
    children: ReactNode,
    initialSteps: IStep[],
    onChange?: (steps : IStep[])=>void
}


export default function TimelineProvider({ children, initialSteps = [], onChange = ()=>{} } : Props){
    const [steps, setSteps] = useState<IStep[]>(initialSteps);
    const stepsSorted = useMemo(()=>{
        return steps
        .map((s, index)=>{ return {...s, initIndex: index} })
        .sort((a, b) => { return a.start - b.start })
    },[steps]);
    const [videoData, setVideoData] = useVideoContext();

    useEffect(()=>{
        onChange(stepsSorted);
    }, [stepsSorted])

    function setStepByIndex(index, newData){
        if(steps[index]){
            setSteps([
                ...stepsSorted.slice(0, index),
                newData,
                ...stepsSorted.slice(index + 1)
            ])
        }
    }

    function isStepActive(index){
        if(!stepsSorted[index] || !videoData.currentMS)
            return false;
        const end = getStepEnd(index);
        if(stepsSorted[index].start <= videoData.currentMS && end > videoData.currentMS)
            return true;
        return false;
    }

    const getStepEnd = (index) => {
        if(stepsSorted[index].end)
            return stepsSorted[index].end;
        else if(stepsSorted[index+1])
            return stepsSorted[index+1].start;
        return videoData.durationMS ?? 0;
    }

    function msToPrecentage(ms){
        if(!videoData.durationMS || videoData.durationMS <= 0) return 0;
        return ms / (videoData.durationMS / 100);
    }
    return(
        <TimelineContext.Provider value={[stepsSorted, setStepByIndex, setSteps, {
            getStepEnd, isStepActive, msToPrecentage
        }]} >
            {children}
        </TimelineContext.Provider>
    )
}

export const useTimelineProvider = () => {
    return useContext(TimelineContext);
}