import firebase from "firebase";
import { useState } from "react";
import { db } from "../../firebase";
import { casefold, toChunkOf } from "../../helpers/functions";
import Doc from '../../models/Doc';

export const getDocsByQuery = async (keyword, searchKey, collectionPath, limit): Promise<Doc[]> => {
    try{
        const kWord = casefold(keyword);
        const collRef = await db.collection(collectionPath);
        let query: firebase.firestore.Query = collRef;
        if(kWord && kWord != ""){
            query = query
            .where(searchKey, '>=', kWord)
            .where(searchKey, '<', kWord+'z')
        }
        query = query.limit(limit);
        const snapshots = await query.get();
        return snapshots.docs.map(doc =>{
            return {id: doc.id, data: doc.data()};
        })
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

const useDBSearch = (searchKey: string, collectionPath: string, limit: number) => {
    
    const [docs, setDocs] = useState<Promise<Doc[]>>();

    const searchQuery = (query) => {
        const newDocs = getDocsByQuery(query, searchKey, collectionPath, limit);
        setDocs(newDocs);
    }

    const searchIds = (ids: string[]) => {
        const newDocs = getDocsByIds(ids, collectionPath);
        setDocs(newDocs);
    }

    

    

    return [docs, searchQuery, searchIds] as const;
} 

export default useDBSearch;