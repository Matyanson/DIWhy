import Container from "./Container";
import ExpandWrap from "./ExpandWrap";
import { Search } from "./icons";
import DBSelect from "./TagSelect/DBTagSelect";
import { useState } from "react";
import { useRouter } from 'next/router';
import ListItem from "../models/ListItem";


interface Props{
}

const SearchBar = (
props: Props)=> {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [tools, setTools] = useState<ListItem[]>([]);
    const [material, setMaterial] = useState<ListItem[]>([]);
    const search = () =>{
        router.push({
            pathname: "/search",
            query: {
                q: query,
                tools: tools.filter(x => x.selected).map(x => x.id),
                material: material.filter(x => x.selected).map(x => x.id)
            }
        })
    }
    return (
        <Container>
            <div className="searchBar">
                <div className="input">
                    <input type="text" placeholder="Search whatever you need!"
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter")
                        search();
                    }}
                    />
                    <button onClick={()=>search()}><Search/></button>
                </div>
                <ExpandWrap label={"more filters"}> 
                <div className="select">
                    <div className="column">
                        <h4>Tools</h4>
                        <DBSelect
                            collectionPath={"tools"}
                            displayTextKey={"name"}
                            initItems={tools}
                            onChange={(d)=>{setTools(d)}}
                        />

                    </div>
                    <div className="column">
                        <h4>Material</h4>
                        <DBSelect
                            collectionPath={"material"}
                            displayTextKey={"name"}
                            initItems={material}
                            onChange={(d)=>{setMaterial(d)}}
                        />
                    </div>
                </div>
                </ExpandWrap>
                <style jsx>{`
                    .searchBar{
                        width:100%;
                        max-width: 650px;
                    }
                    .input{
                        display: flex;
                    }
                    .input input{
                        margin: 0;
                        border-radius: 3px 0 0 3px;
                        font-size: 1.2rem;
                        padding: 8px;
                    }
                    .input button{
                        border-radius: 0 3px 3px 0;
                        width: 60px;
                        font-size: 1.3rem;
                    }
                    .select{
                        display: flex;
                        flex-flow: row;
                        justify-content: space-around;
                    }
                `}</style>
            </div>
        </Container>
    );
}

export default SearchBar;