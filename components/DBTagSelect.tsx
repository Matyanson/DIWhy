import { useEffect, useState } from 'react';
import TagSelect from './TagSelect';
import { db } from '../firebase';
import { casefold } from '../helpers/functions';

interface Props {
    collectionPath: string,
    displayTextKey: string,
    idKey?: string,
    limit?: number,
    onChange: ([])=> void
}

const DBTagSelect = ({
        collectionPath,
        displayTextKey = "name",
        idKey = "__name__",
        limit = 7,
        onChange = ()=>{}
    }: Props)=> {

    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [select, setSelect] = useState([]);

    useEffect(()=>{
        onSearch("");
    }, [])

    useEffect(()=>{
        onChange(selectedItems().map(x => x.id));
    }, [selected])

    const itemsDisplay = ()=>{
        return items.map(x=>{
            if(x.data[displayTextKey])
                return x.data[displayTextKey];
            return "null";
        })
    }

    const selectedItems = () =>{
        return selected.map(i=>{
            if(items[i])
            return items[i]
        });
    }

    async function onSearch(keyword){
        const newItems = await getNewItems(keyword);
        const oldSelectedItems = selectedItems();

        const selectNew = [];
        for(let i = 0; i < oldSelectedItems.length; i++){
            selectNew.push(i);
        }

        const newMergedItems = oldSelectedItems.concat(newItems);
        setItems(newMergedItems);
        setSelect(selectNew);
    }

    async function getNewItems(keyword){
        const newSnapshots = await getDocs(keyword);

        const oldSelectedItems = selectedItems();

        const newItems = [];
        newSnapshots.forEach((snap)=>{
            //pokud se nový item nenachzí už ve vybraných (no duplicit)
            if(!oldSelectedItems.find(x => x.id == snap.id )){
                newItems.push({
                    id: snap.id,
                    data: snap.data()
                });
            }
        })

        return newItems;
    }

    async function getDocs(keyword){
        const kWord = casefold(keyword);
        const collRef = await db.collection(collectionPath);
        let query;
        if(kWord && kWord != ""){
            query = await collRef
            .where(idKey, '>=', kWord)
            .where(idKey, '<', kWord+'z')
            .limit(limit);
        }
        else query = await collRef.limit(limit);
        const snapshots = await query.get();
        return snapshots;
    }
    return (
        <div>
            <TagSelect items={itemsDisplay()} onSelect={(data)=>setSelected(data)} onSearch={(x)=>onSearch(x)} select={select} />
        <style jsx>{`
        `}</style>
        </div>
    );
}

export default DBTagSelect;