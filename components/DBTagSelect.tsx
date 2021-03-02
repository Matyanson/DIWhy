import { useEffect, useMemo, useState } from 'react';
import TagSelect from './TagSelect';
import { db } from '../firebase';
import { casefold, toArrOfNum, toChunkOf } from '../helpers/functions';
import Doc from '../models/Doc';

interface Props {
    collectionPath: string,
    displayTextKey: string,
    initialIds?: string[],
    idKey?: string,
    limit?: number,
    onChange: ([])=> void
}

const DBTagSelect = ({
        initialIds = [],
        collectionPath,
        displayTextKey = "name",
        idKey = "__name__",
        limit = 7,
        onChange = ()=>{}
    }: Props)=> {

    const [items, setItems] = useState<Doc[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [select, setSelect] = useState([]);
    const selectedItems = useMemo(()=>{
        return selected.map(x=>items[x]);
    }, [selected])

    useEffect(()=>{
        if(initialIds && initialIds[0])
            setNewItemsById(initialIds)
        onSearch("");
    }, [initialIds])


    const updateSelectedValue = (data: number[]) =>{
        setSelected(data);
        const out = selected.map(x=>{
            if(items[x])
                return items[x];
        });
        console.log(items);
        console.log(selected);
        console.log(out);
        onChange(out)
    }

    const itemsDisplay = ()=>{
        return items.map(x=>{
            if(x.data && x.data[displayTextKey])
                return x.data[displayTextKey];
            
        })
    }

    const getDocsByIds = async (ids:string[]): Promise<Doc[]> =>{
        let res = [];
        try{
            const idsList = toChunkOf(ids, 10);
            const collectionRef = db.collection(collectionPath);
            const reqList = idsList.map(ids=>{
            return collectionRef.where('__name__', 'in', ids).get();
            });
            const snapshotsList = await Promise.all(reqList);
            snapshotsList.forEach(snap=>{
                res = res.concat(snap.docs.map(doc=>{
                    return {id: doc.id, data: doc.data()};
                }))
            })
        } catch(err){
            console.log(err);
        }
        return res;
    }

    const setNewItemsById = async (ids: string[]) => {
        const newItems = await getDocsByIds(ids);
        setItems(newItems);

        const selectNew = toArrOfNum(newItems);

        setSelected(selectNew);
        setSelect(selectNew);
    }

    async function onSearch(keyword){
        const newItems = await getNewItems(keyword);
        const oldSelectedItems = selected.map(x=>items[x]);

        const selectNew = toArrOfNum(oldSelectedItems);

        const newMergedItems = oldSelectedItems.concat(newItems);
        setItems(newMergedItems);
        setSelect(selectNew);
        setSelected(selectNew);
    }

    async function getNewItems(keyword){
        const newSnapshots = await getDocs(keyword);

        const oldSelectedItems = selected.map(x=>items[x]);

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
            {/* <button onClick={()=>setNewItemsById(initialIds)}></button> */}
            <TagSelect items={itemsDisplay()} onSelect={(data)=>updateSelectedValue(data)} onSearch={(x)=>onSearch(x)} select={select} />
        <style jsx>{`
        `}</style>
        </div>
    );
}

export default DBTagSelect;