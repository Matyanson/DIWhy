import { useEffect, useState } from 'react';
import SliderVertical from './SliderVertical';
import { useVideoContext } from './VideoContextProvider';

interface Props{
}

const TimelineEdit = () => {
    const [videoData, setVideoData] = useVideoContext();
    const [sliderValue, setSliderValue] = useState(videoData.currentMS);

    useEffect(()=>{
        setSliderValue(videoData.currentMS);
    }, [videoData.currentMS])

    function setTime(ms){
        setVideoData({ ...videoData, setMS: ms});
        //setSliderValue(ms);
    }
    return (
        <div className="wrap">
            <SliderVertical min={0} max={videoData.durationMS ?? 10000} value={sliderValue} onChange={(v)=>setTime(v)} inverted={true}/>
            {sliderValue}<br/>
            {Math.floor(videoData.currentMS)}<br/>
            {videoData.lengthMS}
            <style jsx>{`
                .wrap{
                    display: flex;
                    flex-flow: row nowrap;
                    height: 80vh;
                }
            `}</style>
        </div>
    );
}

export default TimelineEdit;