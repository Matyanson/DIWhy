import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import Tag from './Tag';
import themes from '../assets/templates';

interface Props {
    items: string[],
    select?: number[],
    onSelect?: (select: number[]) => void,
    onSearch?: (keyword: string) => void
}

const TagSelect = ({
        items,
        select = [],
        onSelect = ()=> {},
        onSearch = ()=> {}
    }: Props)=> {

    const [theme] = useTheme();
    const [focused, setFocus] = useState(false);
    const [selected, setSelected] = useState(select);
    const [query, setQuery] = useState("");

    useEffect(()=>{
        setSelected(select);
    }, [select])

    function focus(){
        setFocus(true);
    }

    function unfocus(){
        setFocus(false);
    }

    function addItem(newIndex){
        updateSelected([...selected, newIndex]);
    }

    function deleteItem(index){
        updateSelected([...selected.slice(0,index),
            ...selected.slice(index+1)]);
    }

    function updateSelected(newSelected){
        setSelected(newSelected);
        onSelect(selected);
    }

    const updateSerach = (q: string) =>{
        onSearch(q);
        setQuery(q);
    }

  return (
    <div className="selectContainer">
        <div onFocus={()=>focus()} onBlur={()=>unfocus()} tabIndex={0}>
            <div className="selectHead">
                <input type="text" onFocus={()=>focus()} value={query} onChange={(e)=>{updateSerach(e.target.value)}} /><div className="more_btn">ˇ</div>
            </div>
            {
                items && focused &&
                <div className="items">
                {
                    items.map((x, index)=>{
                        if(!selected.includes(index))
                            return <div key={index} onMouseDown={()=>{addItem(index)}} >{x}</div>
                    })
                }
                </div>
            }
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
              margin: 5px 0;
          }
          .selectHead{
              display: flex;
              flex-flow: row;
          }
          .selectHead input{
            margin: 0; 
            padding: 5px;
            font-size: 1.2rem;
            border-radius: 0;
          }
          .more_btn{
            background: ${theme.primary};
            color: ${theme.background};
            padding: 2px;
            cursor: pointer;
            text-align: center;
          }
          .items{
              position: absolute;
              width: 100%;
              border: solid 1px ${theme.neutral_dark};
              z-index: 10;
          }
          .items div{
              cursor: pointer;
              background: ${theme.background};
              color: ${theme.text}
          }
          .items div:hover{
              background: ${theme.neutral_dark};
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