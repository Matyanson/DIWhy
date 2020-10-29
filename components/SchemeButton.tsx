const SchemeSwitch = (props)=>{
    let colors = Object.values(props.colors);
    return (
        <div className="palete">{
            colors.map((x, index)=>{
                return <div key={index} className="color" style={{background:`${x}`}} ></div>
            })
            }
            <style jsx >{`
                .palete{
                    width: 50px;
                    height: 20px;
                    margin: 0 5px;
                    border-radius: 6px;
                    overflow: hidden;
                    display: flex;
                    flex-flow: row;
                    align-items: stretch;
                    justify-content: stretch;
                }
                .palete:hover{
                    filter: contrast(0.5);
                }
                .color{
                    flex: 1;
                }
            `}</style>
        </div>
    );
}

export default SchemeSwitch;