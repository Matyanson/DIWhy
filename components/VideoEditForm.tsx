import React, { useContext, useEffect, useState } from 'react';
import DBAdd from './DBAdd';
import DBSelect from './DBTagSelect';
import { TimelineEdit } from './TimelineEdit/index';
import { useTheme } from './ThemeProvider';
import VideoPlayer from './HtmlVideoDisplay';
import VideoControls from './VideoControls';
import VideoContextProvider from './VideoContextProvider';
import Input from './styled/Input';
import Checkbox from './styled/Checkbox';
import ExpandWrap from './ExpandWrap';
import Step from '../models/Step';

interface VideoForm {
    title: string,
    public: boolean,
    tools: string[],
    material: string[],
    steps: Step[]
}

interface Props {
    url: string,
    initialForm?: VideoForm,
    onChange: (data: VideoForm) => void
}

const defaultForm: VideoForm = {
    title: "",
    public: true,
    tools: [],
    material: [],
    steps: []
}

const VideoEditForm = ({url, initialForm = defaultForm, onChange}: Props)=> {
    const [theme] = useTheme();
    const [form, setForm] = useState<VideoForm>(initialForm);
    
    useEffect(()=>{
        onChange(form);
    }, [form])
    
    useEffect(()=>{
        setForm(initialForm);
    }, [initialForm])

    function test(){
    }
  return (
    <div>
        <VideoContextProvider>
        <div className="formWrap">
            <div className="left">
                <div className="vidPlayer">
                    <VideoControls>
                        <VideoPlayer url={url} />
                    </VideoControls>    
                </div>
                <Input type="text" label="Title of the video" value={form.title} onChange={(e)=>{setForm({...form, title: e.target.value})}} />
                Public <Checkbox checked={form.public} onChange={()=>{setForm({...form, public: !form.public}); console.log("check")}} />
                <div className="tags">
                    <div className="select">
                        <div className="column">
                            <h4>Tools</h4>
                            <DBSelect initialIds={form.tools} onChange={(d)=>setForm({...form, tools: d.map(x=>x.id)})} displayTextKey={"name"} collectionPath={"tools"}/>

                        </div>
                        <div className="column">
                            <h4>Material</h4>
                            <DBSelect initialIds={form.material} onChange={(d)=>setForm({...form, material: d.map(x=>x.id)})} displayTextKey={"name"} collectionPath={"material"}/>
                        </div>
                    </div>
                    <ExpandWrap label={"can't find your tag? create new!"}>
                    <div className="add">
                        <div className="column">
                            <DBAdd collectionPath="tools"/>
                        </div>
                        <div className="column">
                            <DBAdd collectionPath="material" />
                        </div>
                    </div>                          
                    </ExpandWrap>
                </div>
            </div>
            <div className="right">
                <TimelineEdit editable={true} onChange={(steps)=>{setForm({...form, steps: steps})}} />
            </div>
        </div>
        </VideoContextProvider>
        <style jsx>{`
            .formWrap{
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                margin: 5px 0;
            }
            .vidPlayer{
                position: sticky;
                top: 40px;
                z-index: 10;
                width: 100%;
                max-width: 600px;
                height: auto;
                /*max-height: 50vh;*/
            }
            .left, .right{
                margin: 5px;
            }
            .tags{
                display: flex;
                flex-flow: column;
                justify-content: start;
            }
            .tags .select, .tags .add{
                width: auto;
                display: flex;
                flex-flow: row wrap;
                justify-content: start;
            }
            .tags .addEdge{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
            }
            .tags .addEdge .line{
                height: 1px;
                width: auto;
                flex: 1;
                margin: auto 5px;
                background: ${theme.text};
            }
            .tags .addEdge .arrow{
                padding: 2px;
                fill: ${theme.text};
            }
            .tags .hidden{
                height: 0px;
                overflow: hidden;
            }
            .column{
                display: flex;
                flex-flow: column;
                justify-content: left;

                padding: 5px;
                max-width: 200px;
            }
            input[type=text]{
                padding: 7px;
                font-size: 1.2rem;
            }
            `}</style>
    </div>
  );
}

export default VideoEditForm;