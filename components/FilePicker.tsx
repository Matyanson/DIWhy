import { useState } from 'react';
import FilePickerWrapper from './FilePickerWrapper';
import {Upload} from './icons'
import { useTheme } from './ThemeProvider';

interface Props {
  accept?: string,
  multiple?: boolean,
  Icon?: React.ReactNode
  onSelect: (files:File[])=> void
}

const FilePickerCopy = ({
  accept = "",
  multiple = false,
  Icon = <Upload/>,
  onSelect
}: Props)=> {

  const [colors] = useTheme();
  function onFileChange(newFiles: File[]){
      onSelect(newFiles);
  }
  return (
    <div className="filePicker">
      <FilePickerWrapper fileNameVisible={true} multiple={multiple} accept={accept} onSelect={ (files)=> onFileChange(files) }>
        <div className="wrap">
          <div className="icon">
            {Icon}
          </div>
        </div>
      </FilePickerWrapper>
        <style jsx>{`
          .filePicker{
            margin: 10px;
          }
          .wrap{
            background: ${colors.neutral_dark};
            height: 120px;
            width: 120px;
            border-radius: 50%;
            border: 1px ${colors.text} dashed;
            display: flex;
            justify-content: center;
            transition: all 0.2s;
          }
          .filePicker:hover .wrap{
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

export default FilePickerCopy;