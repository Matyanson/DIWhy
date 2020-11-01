import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useContext } from 'react'

type Props = {
    value: number
};

const Progressbar = (props: Props)=> {
  const [{ primary, text, background }] = useTheme();
  return (
    <div>
        <div className="progressbar">
          <div className="bar"></div>
        </div>
        <style jsx >{`
        .progressbar{
          height: 10px;
          width: 100%;
          background: ${text};
          border-radius: 7px;
          overflow: hidden;
          margin: 5px;
        }
        .bar{
          height:100%;
          width: ${props.value}%;
          background: ${primary};
        }
        `}</style>
    </div>
  );
}

export default Progressbar;