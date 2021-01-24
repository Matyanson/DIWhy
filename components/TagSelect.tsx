import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import Tag from './Tag';

interface Props {
    items: string[],
    select?: number[],
    onSelect?: (select: number[]) => void,
    onSearch?: (keyword: string) => void
}

const TagSelect = ({
        items,
        select = [],
        onSelect,
        onSearch = ()=> {}
    }: Props)=> {

    const [{ primary, background }] = useTheme();
    const [focused, setFocus] = useState(false);
    const [selected, setSelected] = useState(select);

    function focus(){
        setFocus(true);
    }

    function unfocus(){
        setFocus(false);
    }

    function addItem(newIndex){
        setSelected([...selected, newIndex]);
    }

    function deleteItem(index){
        setSelected([...selected.slice(0,index),
            ...selected.slice(index+1)]);
    }

    function updateItems(){
        onSelect(selected);
    }

    useEffect(()=>{
        updateItems();
    },[selected])

  return (
    <div className="selectContainer">
        <div onFocus={()=>focus()} onBlur={()=>unfocus()} tabIndex={0}>
            <div className="selectHead">
                <input type="text" onFocus={()=>focus()} onChange={(e)=>{onSearch(e.target.value)}} /><div className="more_btn">ˇ</div>
            </div>
            <div className="items">
                {
                    items && focused &&
                    items.map((x, index)=>{
                        if(!selected.includes(index))
                            return <div key={index} onMouseDown={()=>{addItem(index)}} >{x}</div>
                    })
                }
            </div>
        </div>
        <div className="tagsContainer">
            {
                selected &&
                selected.map((x,i)=>{
                return <div key={i} className="tagWrap" onClick={()=>deleteItem(i)}><Tag title={items[x]} /></div>
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
          .tagsContainer{
            display: flex;
            flex-flow: row wrap;
            width: 100%;
          }
          .tagWrap{
              cursor: pointer;
          }
      `}</style>
    </div>
  );
}

export default TagSelect;