import Container from "./Container";
import ExpandWrap from "./ExpandWrap";
import { Search } from "./icons";
import DBSelect from "./TagSelect/DBTagSelect";
import { useState } from "react";
import { useRouter } from 'next/router';


interface Props{
}

const SearchBar = (
props: Props)=> {
    const router = useRouter();
    const [form, setForm] = useState({
        query: "",
        tools: [],
        material: []
    });
    const search = () =>{
        router.push(`/search?q=${form.query}`);
    }
    return (
        <Container>
            <div className="searchBar">
                <div className="input">
                    <input type="text" placeholder="Search whatever you need!"
                    value={form.query}
                    onChange={(e)=>setForm({...form, query: e.target.value})}
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
                            onChange={(d)=>setForm({...form, tools: d.filter(
                                    x => x.selected
                                ).map(x=>x.id)})}
                            displayTextKey={"name"}
                            collectionPath={"tools"}/>
                        </div>
                        <div className="column">
                            <h4>Material</h4>
                            <DBSelect
                            onChange={(d)=>setForm({...form, material: d.filter(
                                    x => x.selected
                                ).map(x=>x.id)})}
                            displayTextKey={"name"}
                            collectionPath={"material"}/>
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