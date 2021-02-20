import { useState } from 'react';
import FilePickerWrapper from './FilePickerWrapper';
import {Upload} from './icons'
import { useTheme } from './ThemeProvider';

interface Props {
    top?: string,
    left?: string,
    right?: string,
    bottom?: string,
    children: JSX.Element
}

const IconWrap = ({
  top = null,
  left = null,
  right = null,
  bottom = null,
  children
}: Props)=> {
  const [active, setActive] = useState(false);
  const [colors] = useTheme();
  return (
    <>
    {
      active &&
      <div className="float">
        {children}
        <button onClick={()=>setActive(!active)}>pin</button>
      </div>
    }
    {
      !active &&
      <>
        <button onClick={()=>setActive(!active)}>pin</button>
        {children}
      </>
    }
        <style jsx>{`
          button{
            position: absolute;
            top:0;
            left:0;
            z-index: 91;
          }
          .float{
            position: fixed;
            ${top? `top: ${top}`:''};
            ${left? `left: ${left}`:''};
            ${right? `right: ${right}`:''};
            ${bottom? `bottom: ${bottom}`:''};
            margin: auto;
            max-height: 40vh;
            z-index: 90;
          }
          `}</style>
    </>
  );
}

export default IconWrap;