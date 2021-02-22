import { useState } from "react";
import { ChevronDown, ChevronUp } from "./icons"

interface Props {
    label: string,
    children: JSX.Element
}

const ExpandWrap = ({label, children}: Props)=>{
    const [opened, setOpened] = useState(false);

    return (
        <div className={`expandable ${opened ? 'opened': ''}`}>
            <div className="head" onClick={()=>setOpened(!opened)}>
                <div className="label">{label}</div>
                <div className="right"><ChevronDown/></div>
            </div>
            <div className="content">
                {children}
            </div>
            <style jsx>{`
                .head{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    justify-content: space-between;
                    border-top: 1px solid grey;
                    padding: 5px 0;
                    margin-top: 5px;
                    cursor: pointer;
                }
                .right{
                    font-weight: bold;
                    font-size: 1.2rem;
                    transform: rotate(0deg);
                    transition: transform 0.2s;
                }
                .opened .right{
                    transform: rotate(180deg);
                }
                .content{
                    height: 0;
                    filter: opacity(0);
                    transform: scaleY(0);
                    transform-origin:top;
                    transition: transform 0.2s, filter 0.4s ease;
                }
                .opened .content{
                    height: auto;
                    filter: opacity(1);
                    transform: scaleY(1);
                }
            `}</style>
        </div>
    );
}

export default ExpandWrap;