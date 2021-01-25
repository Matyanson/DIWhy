import Step from './Step';
import IStep from '../../models/Step';
import { useTimelineProvider } from './TimelineProvider';
import { useVideoContext } from '../VideoContextProvider';
import { msToTimePattern } from '../../helpers/functions';

interface Props{
    steps: IStep[]
}

const TimesContainer = () => {
    const [steps, setStepByIndex, setSteps, {getStepEnd, isStepActive, msToPrecentage}] = useTimelineProvider();
    const [videoData, setVideoData] = useVideoContext();
    return (
        <div className="times">
            <div className="time">{msToTimePattern(0)}</div>
                {
                    steps.map((s, index)=>
                        <div key={index} style={{top: `${msToPrecentage(s.start)}%`}} className="time abs">
                            {msToTimePattern(s.start)}
                        </div>
                    )
                }
            <div className="time">{msToTimePattern(videoData.durationMS??0)}</div>
            <style jsx >{`
            .abs{
                position: absolute;
            }
            .times{
                position: relative;
                height: auto;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
            }
            .time{
                right:0;
                text-align: right;
            }
            `}</style>
        </div>
    );

}
export default TimesContainer;