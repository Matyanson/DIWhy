import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface Props{
    min?: number,
    max?: number,
    value?: number,
    onChange?: (n: number)=>void
}

const Slider = ( {min=0, max=100, value=0, onChange=()=>{}}: Props)=>{
    const [innerValue, setValue] = useState(value);
    const percentage = useMemo(()=>innerValue / (Number(max) / 100),[value]);
    const [theme] = useTheme();
    useEffect(()=>{
        setValue(Number(value));
    }, [value])
    function changeValue(n: number){
        onChange(n);
        setValue(n);
    }
    return(
        <div className="sliderWrap">
            <input type="range" value={innerValue} min={min} max={max} onChange={(e)=>{changeValue(Number(e.target.value))}} />
            <div className='slider'>
                <div className="track"></div>
                <div className="range" style={{width: `${percentage}%`}} ></div>
                <div className="thumb" style={{left: `${percentage}%`}}></div>
            </div>
            <style jsx>{`
            .sliderWrap{
                height: 15px;
                width: 100%;
                position: relative;
            }
            input[type=range]{
                z-index: 2;
                position: absolute;
                top:0;
                left:0;
                height: 100%;
                width: 100%;
                opacity: 0;
            }
            .slider{
                z-index: 1;
                position: relative;
                height: 100%;
                width: 100%;
            }
            .slider > .track{
                position: absolute;
                background: #ddd;
                width:100%;
                height: 2px;
                top: 0;
                bottom: 0;
                margin: auto 0;
                border-radius: 5px;
            }
            .slider > .range{
                position: absolute;
                bottom: 0;
                top: 0;
                left: 0;
                margin: auto 0;
                background: ${theme.primary};
                height: 5px;
                border-radius: 5px;
                transition: all 0.1s;
            }
            .slider > .thumb{
                position: absolute;
                transform: translateX(-50%);
                width: 0px;
                height: 0px;
                left: 0;
                bottom: 0;
                top: 0;
                margin: auto 0;
                border-radius: 50px;
                background: ${theme.primary};
                opacity: 1;
                transition: all 0.1s;
            }
            .sliderWrap:hover .thumb{
                opacity: 1;
                width: 10px;
                height: 10px;
            }
            `}</style>
        </div>
    )
}

export default Slider;