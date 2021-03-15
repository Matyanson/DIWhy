import { useEffect, useMemo, useState } from "react";
import Doc from "../../models/Doc";
import ListItem from "../../models/ListItem";
import TagSelect from "./TagSelect"
import useDBSearch, { getDocsByIds, getDocsByQuery } from "./useDBSearch";
import useItemList from "./useItemList";

interface Props {
    initItems?: ListItem[],
    searchKey?: string,
    displayTextKey?: string,
    collectionPath: string,
    limit?: number,
    onChange: (items: ListItem[]) => void
}

const DBTagSelect = ({
    initItems = [],
    searchKey = "__name__",
    displayTextKey = "name",
    collectionPath,
    limit = 10,
    onChange = () => {}
}: Props) => {

    useEffect(()=>{
        search("");
    }, [])

    const saveNewItems = ( itemsToAdd: ListItem[]) => {

        const oldSelected = initItems.slice().filter(x => x.selected);
        const newUnselected = itemsToAdd
        .filter(x => {
            //avoid duplicates
            return !oldSelected.some(y => y.id == x.id);
        });
        const newItems = newUnselected.concat(oldSelected);
        return newItems;
    }

    const docsToItems = async(docs: Promise<Doc[]>, select: boolean = false): Promise<ListItem[]> => {
        const newDocs = await docs;
        if(newDocs){
            return newDocs.map(d => {
                return {id: d.id, label: d.data[displayTextKey], selected: select}
            })
        }
        return [];
    }

    const updateItems = (newItems: ListItem[]) =>{
        onChange(newItems);
    }

    const search = async(query: string) => {
        console.log('search', query);
        const newDocs = getDocsByQuery(query, searchKey, collectionPath, limit);
        const sItems = await docsToItems(newDocs);
        const newItems = saveNewItems(sItems);
        onChange(newItems);
    }

    return (
        <div>
            <TagSelect
                initItems={initItems}
                onChange={(newItems)=>{onChange(newItems)}}
                onSearch={(q)=>{search(q);}}
            />
        </div>
    );
}

export default DBTagSelect;