import Step from './Step';
import IStep from '../../models/Step';
import SideBlock from './SideBlock';
import { useTimelineProvider } from './TimelineProvider';
import { useVideoContext } from '../VideoContextProvider';

interface Props{
    steps: IStep[]
}

const SideMap = () => {
    const [steps, setStepByIndex, setSteps, {getStepEnd, isStepActive, msToPrecentage}] = useTimelineProvider();
    const [videoData, setVideoData] = useVideoContext();
    return (
        <div className="sideMap">
            {
                steps.map((step, index)=>
                    <SideBlock
                        key={index}
                        onClick={()=>setVideoData({...videoData, setMS: step.start})}
                        active={isStepActive(index)}
                        top={msToPrecentage(step.start)}
                        height={msToPrecentage(getStepEnd(index)) - msToPrecentage(step.start)}
                    />
                )
            }
            <style jsx >{`
            .sideMap{
                position: relative;
                width: 10px;
                height: auto;
            }
            `}</style>
        </div>
    );

}
export default SideMap;