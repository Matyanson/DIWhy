import { useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

const TagSelect = ({items, onChange})=> {
    const [{primary, background}] = useTheme();
    const [focused, setFocus] = useState(false);
    const [selected, setSelected] = useState([]);

    function focus(){
        setFocus(true);
    }

    function unfocus(){
        setFocus(false);
    }

    function addItem(newIndex){
        setSelected([...selected, newIndex]);
        updateItems();
    }

    function deleteItem(index){
        setSelected([...selected.slice(0,index),
            ...selected.slice(index+1)]);
        updateItems();
    }

    function updateItems(){
        const selItems = selected.map(x=>{
            return items[x];
        })
        onChange(selItems);
    }

  return (
    <div className="selectContainer">
        <div onFocus={()=>focus()} onBlur={()=>unfocus()} tabIndex={0}>
            <div className="selectHead">
                <input type="text" /><div className="more_btn">ˇ</div>
            </div>
            <div className="items">
                {
                    items && focused &&
                    items.map((x, index)=>{
                        if(!selected.includes(index))
                            return <div key={index} onClick={()=>{addItem(index), console.log("click")}} >{x}</div>
                    })
                }
            </div>
        </div>
        <div className="tagsContainer">
            {
                selected &&
                selected.map((x,i)=>{
                return <div className="tag" key={i} onClick={()=>deleteItem(i)}>{items[x]}</div>
                })
            }
        </div>
      <style jsx>{`
          .selectContainer{
              position: relative;
              width: fit-content;
          }
          .selectHead{
              display: flex;
              flex-flow: row;
          }
          .more_btn{
            background: ${primary};
            color: ${background};
            width: 10px;
            cursor: pointer;
            text-align: center;
          }
          .items{
              position: absolute;
              width: 100%;
          }
          .items div{
              cursor: pointer;
              background: #ddd;
          }
          .items div:hover{
              background: #eee;
          }
          .tagContainer{

          }
          .tag{
            background: #65cc5c;
            color: white;
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

export default TagSelect;