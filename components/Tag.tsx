

interface Props{
    title: string,
    background?: string,
    color?: string
}

const Tag = ({ 
    title,
    background = "#65cc5c",
    color = "white"
}: Props)=> {
    return (
        <div className="tag">
            {title}
            <style jsx>{`
            .tag{
                background: ${background};
                color: ${color};
                border-radius: 10px;
                padding: 4px;
                margin: 2px;
                width: fit-content;
                height: fit-content;
            }
            `}</style>
        </div>
    );
}

export default Tag;