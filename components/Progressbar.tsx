import React, { useState } from 'react';
import { db } from '../firebase';

type Props = {
    value: number
};

const Progressbar = (props: Props)=> {
  return (
    <div>
        <div className="progressbar" style={{width: `${props.value}px`}}>
            {props.value}
        </div>
        <style jsx >{`
        .progressbar{
          height: 10px;
          width: ${props.value}px;
          background: #333;
          color: white;
          position: relative;
        }
        .progressbar:after{
          content: '';
          background: #ccc;
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 10px;
          z-index: -1;
        }
        `}</style>
    </div>
  );
}

export default Progressbar;