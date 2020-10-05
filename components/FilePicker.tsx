const FilePicker = (props)=> {
    let files;

    function onFileChange(newFiles){
        console.log("file changed");
        files = newFiles;
        props.changing(files);
    }
  return (
    <div className="FilePicker">
        <input type="file" onChange={(e)=>{onFileChange(e.target.files)}}  />
    </div>
  );
}

export default FilePicker;