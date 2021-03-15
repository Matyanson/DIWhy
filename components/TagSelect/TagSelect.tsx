import { useDebugValue, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import Tag from './Tag';
import { ChevronDown } from '../icons';
import ListItem from '../../models/ListItem';
import useItemList, { addItem, deleteItem } from './useItemList';

interface Props {
    initItems: ListItem[],
    onChange: (newItems: ListItem[]) => void,
    onSearch?: (keyword: string) => void
}

const TagSelect = ({
        initItems = [],
        onChange = () => {},
        onSearch = () => {}
    }: Props)=> {

    const [theme] = useTheme();
    const [focused, setFocus] = useState(false);
    const [query, setQuery] = useState("");

    const indexedItems = useMemo(()=>{
        return initItems.map((x, index)=>{
            return {...x, index}
        })
    }, [initItems])

    const focus = () => {
        setFocus(true);
    }

    const unfocus = () => {
        setFocus(false);
    }

    const onSelect = (index) => {
        const newItems = addItem(index, initItems);
        onChange(newItems);
    }

    const onDelete = (index) => {
        const newItems = deleteItem(index, initItems);
        onChange(newItems);
    }

    const updateSerach = (q: string) =>{
        onSearch(q);
        setQuery(q);
    }

  return (
    <div className="selectContainer">
        <div onFocus={()=>focus()} onBlur={()=>unfocus()} tabIndex={0}>
            <div className="selectHead">
                <input type="text" onFocus={()=>focus()} value={query} onChange={(e)=>{updateSerach(e.target.value)}} /><div className="more_btn"><ChevronDown/></div>
            </div>
            {
                initItems && focused &&
                <div className="items">
                {
                    indexedItems.filter((x) => !x.selected).map((x)=>{
                        return <div key={x.index} onMouseDown={()=>{onSelect(x.index)}} >{x.label}</div>
                    })
                }
                </div>
            }
        </div>
        <div className="tagsContainer">
            {
                indexedItems.filter(x => x.selected).map((x)=>{
                    return <div key={x.index} className="tagWrap" onClick={()=>onDelete(x.index)}><Tag title={x.label} /></div>
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