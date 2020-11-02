interface Props{
    title: string,
    url: string,
    width?: number
}

const VideoPlayer = (props)=> {
const { title, url, width = 650}: Props = props;

    return (
        <div className="video">
            <div>
                <video width={width} controls>
                <source src={url} type="video/mp4"/>
                Your browser does not support the video tag.
                </video>
                <h3>{title}</h3>
            </div>
            <style jsx>{`
                .video{
                    display: flex;
                    flex-flow: column;
                    align-items: left;
                    width: fit-content;
                    margin: 10px;
                }
            `}</style>
        </div>
    );
}

export default VideoPlayer;