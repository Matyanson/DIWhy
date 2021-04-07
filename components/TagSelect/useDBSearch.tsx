import firebase from "firebase";
import { useState } from "react";
import { db } from "../../firebase";
import { casefold, toChunkOf } from "../../helpers/functions";
import Doc from '../../models/Doc';

export const getDocsByQuery = async (keyword, searchKey, collectionPath, sortBy: string, limit: number): Promise<Doc[]> => {
    try{
        const kWord = casefold(keyword);
        const collRef = await db.collection(collectionPath);
        let query: firebase.firestore.Query = collRef;
        if(kWord && kWord != ""){
            query = query
            .where(searchKey, '>=', kWord)
            .where(searchKey, '<', kWord+'z')
        }
        
        if(sortBy && sortBy !== ""){
            query = query.limit(50);
        }
        else
            query = query.limit(limit);

        const snapshots = await query.get();
        let docs: Doc[] =  snapshots.docs.map(doc =>{
            return {id: doc.id, data: doc.data()};
        })

        if(sortBy && sortBy !== ""){
            docs = sortArrayBy(docs, sortBy, false);
            return docs.slice(0, limit);
        }
        return docs;
    } catch(e){
        console.log(e);
    }
    return [];
}

export const getDocsByIds = async (ids: string[], collectionPath): Promise<Doc[]> =>{
    let res = [];
    try{
        const idsList = toChunkOf(ids, 10);
        const collectionRef = db.collection(collectionPath);
        const snapshots = idsList.map(ids=>{
            return collectionRef.where('__name__', 'in', ids).get();
        });
        const snapshotsList = await Promise.all(snapshots);
        snapshotsList.forEach(snap=>{
            res = res.concat(
                snap.docs.map(doc=>{
                    return {id: doc.id, data: doc.data()};
                })
            )
        })
    } catch(err){
        console.log(err);
    }
    return res;
}

const sortArrayBy = (arr: any[], propertyKey: string, asc = true): any[] => {
    const res = arr.slice().sort((a, b) => {
        if(!a.data || ! a.data[propertyKey])
            return 1;
        switch(typeof(a.data[propertyKey])){
            case 'string':
                return asc ? 
                a.data[propertyKey].localeCompare(b.data[propertyKey]) :
                b.data[propertyKey].localeCompare(a.data[propertyKey]);
            case 'number':
                return asc ? 
                a.data[propertyKey] - b.data[propertyKey] :
                b.data[propertyKey] - a.data[propertyKey];
            default: 
                return asc ?
                a.data[propertyKey] - b.data[propertyKey] :
                b.data[propertyKey] - a.data[propertyKey];
        }
    });
    return res;
}

const useDBSearch = (searchKey: string, collectionPath: string, limit: number) => {
    
    const [docs, setDocs] = useState<Promise<Doc[]>>();

    const searchQuery = (query) => {
        const newDocs = getDocsByQuery(query, searchKey, collectionPath, '', limit);
        setDocs(newDocs);
    }

    const searchIds = (ids: string[]) => {
        const newDocs = getDocsByIds(ids, collectionPath);
        setDocs(newDocs);
    }

    

    

    return [docs, searchQuery, searchIds] as const;
} 

export default useDBSearch;