import { useState } from 'react';
import FilePickerWrapper from './FilePickerWrapper';
import {Upload} from './icons'

interface Props {
  accept?: string,
  multiple?: boolean,
  arrowVisible?: boolean,
  textLeft?: string,
  textRight?: string,
  onSelect: (files:any[])=> void
}

const FilePickerCopy = ({
  accept = "",
  multiple = false,
  arrowVisible = true,
  textLeft = "Upload",
  textRight = "file",
  onSelect
}: Props)=> {

    function onFileChange(newFiles){
        onSelect(newFiles);
    }
  return (
    <div className="filePicker">
      <FilePickerWrapper fileNameVisible={true} accept={accept} onSelect={ (files)=> onFileChange(files) }>
        <div className="text">
          <span className="innerText left">{textLeft}</span>
          { arrowVisible && <div id="arrow" ><Upload /></div>}
          <span className="innerText right">{" " + textRight}</span>
        </div>
      </FilePickerWrapper>
        <style jsx>{`
          .name{
            max-width: 250px;
          }
          #arrow{
            width: 60px;
            position: relative;
          }
          #arrow .icon{
            position: absolute;
            width: 100px;
            bottom: 0;
            left: calc(-50px + 30px);
          }
          .text{
            text-align: center;
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            width: 100%;
            font-size: 1.3rem;
            font-weight: bold;
          }
          .innerText{
            flex:1;
          }
          .innerText.left{
            text-align: right;
          }
          .innerText.right{
            text-align: left;
          }
          #file-input{
            position: absolute;
            height: 100%;
            width: 100%;    
            opacity: 0;
            top: 0;
            left: 0;
          }
          .filePicker{
            position: relative;
            background: #ddd;
            color: #333;
            padding: 7px;
            margin-top: 60px;
            border-radius: 10px;
            border: 1px black dashed;
            min-height: 70px;
            display: flex;
            flex-flow: column;
            justify-content: center;
          }
          .filePicker:hover{
            border-color: #22a;
            background: #eee;
            transition: all ease-in-out 0.2s;
          }
          .filePicker:hover #arrow img{
            transform: translateY(7px);
            fill: red;
            transition: all ease-in-out 0.2s;
          }
          `}</style>
    </div>
  );
}

export default FilePickerCopy;