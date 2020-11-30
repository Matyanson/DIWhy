import Container from './Container';

const ProfilePic = ({src, size = 50})=> {
  return (
    <div>
        <img id="pic" src={src} />
      <style jsx>{`
          #pic{
            height: ${size}px;
            width: ${size}px;
            object-fit: cover;
            border-radius: 50%;
          }
      `}</style>
    </div>
  );
}

export default ProfilePic;