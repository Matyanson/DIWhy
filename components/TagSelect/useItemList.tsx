import { useState } from "react";
import ListItem from "../../models/ListItem";

export const addItem = (index, items: ListItem[]) => {
    const newItems = [...items];
    newItems[index].selected = true;
    return newItems;
}

export const deleteItem = (index, items: ListItem[]) => {
    const newItems = [...items];
    newItems[index].selected = false;
    return newItems
}

const useItemList = (initItems: ListItem[] = []) => {
    
    const [items, setItems] = useState<ListItem[]>(initItems);

    const add = (index) => {
        const newItems = addItem(index, items);
        setItems(newItems);
    }

    const remove = (index) => {
        const newItems = deleteItem(index, items);
        setItems(newItems);
    }

    return [items, add, remove, setItems] as const;
} 

export default useItemList;