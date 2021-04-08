import React from "react";
import FilePickerWrapper from './FilePickerWrapper';
import ProfilePic from './ProfilePicture';
import { useAuth } from "./UserProvider";

interface Props {
    size: number,
    onChange: (files: any[])=>void
}

const ProfilePicChanger = ({onChange, size = 50}: Props)=> {
    const user = useAuth();
  return (
    <div className="wrapper">
        <FilePickerWrapper onSelect={(data)=>{onChange(data)}} fileNameVisible={false} >
              <ProfilePic src={user.img} size={size} />
              <div className="text">Change picture</div>
        </FilePickerWrapper>
      <style jsx>{`
        .wrapper{
            position: relative;
            border-radius: 50%;
            overflow: hidden;
            height: fit-content;
            width: fit-content;
        }
        .text{
            width: 100%;
            height:100%;
            position: absolute;
            text-align: center;
            top:0;
            left:0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #222;
            color: white;
            opacity: 0%;
            transition: all 0.2s;
        }
        .wrapper:hover .text{
            opacity: 70%;
        }
      `}</style>
    </div>
  );
}

export default ProfilePicChanger;