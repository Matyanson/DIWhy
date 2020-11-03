import { useState } from 'react';

const FilePicker = (props)=> {
  const [fileName, setFilename] = useState("");
    let files;

    function onFileChange(newFiles){
        console.log("file changed");
        files = newFiles;
        props.onSelect(files);
        if(files[0])
          setFilename(files[0].name);
    }
  return (
    <div className="filePicker">
      <div className="text">
        <span className="innerText left">Upload</span>
        <div id="arrow" ><img src="down-arrow.svg"/></div>
        <span className="innerText right">file</span>
      </div>
        <input id="file-input" type="file" onChange={(e)=>{onFileChange(e.target.files)}} />
        <div className="name">{fileName}</div>
        <style jsx>{`
          .name{
            max-width: 250px;
          }
          #arrow{
            width: 60px;
            position: relative;
          }
          #arrow img{
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

export default FilePicker;