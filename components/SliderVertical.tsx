import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface Props{
    max?: number,
    min?: number,
    value?: number,
    inverted?: boolean,
    onChange?: (n:number)=>void
}

const SliderVertical = ({
    max = 100,
    min = 0,
    value = 0,
    inverted = false,
    onChange = ()=>{}
}: Props)=> {
    const [theme] = useTheme();
    const [innerValue, setValue] = useState(value);
    const inveredValue = useMemo(()=>calculateInversion(innerValue), [innerValue]) ;
    const percentage = useMemo(() => { return innerValue / (max / 100) }, [innerValue]);

    function calculateInversion(v){
        return inverted ? max - v : v;
    }

    useEffect(()=>{
        setValue(value);
    }, [value])

    function updateValue(newValue){
        const inverted = calculateInversion(newValue);
        setValue(inverted);
        onChange(inverted);
    }
    return (
        <div className="wrap">
            <input type="range" min={min} max={max} value={inveredValue} onChange={(e)=>updateValue(e.target.value)}></input>
            <div className={`slider ${inverted?'inverted': ''}`}>
                <div className="track"></div>
                <div className="range" style={{height: `${percentage}%`}} ></div>
                <div className="thumb" style={inverted ? {top: `${percentage}%`, transform: `translateY(-50%)`} : {bottom: `${percentage}%`}} ></div>
            </div>
            {innerValue}
            <style jsx>{`
                .wrap{
                    position: relative;
                    height: 100%;
                    width: 20px;
                }
                input[type=range]{
                    z-index: 2;
                    position: absolute;
                    top:0;
                    left:0;
                    -webkit-appearance: slider-vertical;
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
                    background: #000;
                    width:2px;
                    height: 100%;
                    margin: 0 auto;
                    border-radius: 5px;
                }
                .slider > .range{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    background: ${theme.dark};
                    width: 5px;
                    border-radius: 5px;
                    transition: all 0.1s;
                }
                .slider > .thumb{
                    position: absolute;
                    transform: translateY(50%);
                    width: 0px;
                    height: 0px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    border-radius: 50px;
                    background: ${theme.dark};
                    opacity: 1;
                    transition: all 0.1s;
                }
                .wrap:hover .thumb{
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                }
                .slider.inverted > .range{
                    top: 0;
                    left: 0;
                }
                
            `}</style>
        </div>
    );
}

export default SliderVertical;