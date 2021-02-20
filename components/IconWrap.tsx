import { useState } from 'react';
import FilePickerWrapper from './FilePickerWrapper';
import {Upload} from './icons'
import { useTheme } from './ThemeProvider';

interface Props {
    children: JSX.Element
}

const IconWrap = ({
    children
}: Props)=> {

  const [colors] = useTheme();
  return (
    <div className="iconWrap">
          <div className="icon">
            {children}
        </div>
        <style jsx>{`
          .iconWrap{
            background: ${colors.neutral_dark};
            height: 120px;
            width: 120px;
            border-radius: 50%;
            border: 1px ${colors.text} dashed;
            display: flex;
            justify-content: center;
            transition: all 0.2s;
          }
          .iconWrap:hover{
            color: ${colors.primary};
            border-color: ${colors.primary};
            filter: brightness(1.1);
          }
          .icon{
            margin: auto;
            text-align: center;
            font-size: 3.5rem;
          }
          `}</style>
    </div>
  );
}

export default IconWrap;