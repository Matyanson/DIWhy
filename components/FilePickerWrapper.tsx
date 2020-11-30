import { useState } from 'react';

interface Props {
  accept?: string,
  fileNameVisible?: boolean,
  onSelect: (files:any[])=> void,
  children: any
}

const FilePicker = ({
  accept,
  fileNameVisible = false,
  onSelect,
  children
}: Props)=> {
  const [fileName, setFilename] = useState("");

    function onFileChange(newFiles){
        const files = newFiles;
        onSelect(files);
        if(files[0])
          setFilename(files[0].name);
    }

  return (
    <div className="filePicker">
        {children}
        <input id="file-input" type="file" accept={accept} onChange={(e)=>{onFileChange(e.target.files)}} />
        { fileNameVisible &&  <div className="name">{fileName}</div>}
        <style jsx>{`
        #file-input{
            position: absolute;
            height: 100%;
            width: 100%;    
            opacity: 0;
            top: 0;
            left: 0;
            cursor: pointer;
          }
          .filePicker{
            position: relative;
            cursor: pointer;
            min-height: 10px;
            min-width: 10px;
          }
          `}</style>
    </div>
  );
}

export default FilePicker;