import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as React from "react";

export function ListMovies({moviesAPI}){
    const setValues = async () =>{
        setMovies(undefined);
        setMovies(await moviesAPI.listMovies());
    }
    const [movies,setMovies]=useState();
    useEffect(()=> {
        setValues()
    },[]);
    if(!movies)
    {
        return (<div>loading...</div>)
    }
    return(
        <div >
            <h1>Movies</h1>
            {movies.map(m=>
                <div key={m.title}>
                    <h2>{m.title} ({m.year}</h2>
                    <div> {m.plot}</div>
                </div>)}
        </div>)
}

export function NewMovie({moviesAPI}) {
    const [title,setTitle]=useState("");
    const [plot,setPlot]=useState("");
    const [year,setYear]=useState("");

    const navigate = useNavigate();
    async function handleSubmit(e)
    {
        e.preventDefault();
        await moviesAPI.onAddMovie({plot,title,year});
        navigate("/")
    }
    return(
        <form onSubmit={handleSubmit}>
            <h1>New movie</h1>
            <div>
                <label>Title: <input value={title} onChange={e=> setTitle(e.target.value)}/></label>
            </div>
            <div>
                <label>plot: <input value={plot} onChange={e=> setPlot(e.target.value)}/></label>
            </div>
            <div>
                <label>Title: <input value={year} onChange={e=> setYear(e.target.value)}/></label>
            </div>
            <button>Submit</button>
            <pre>
                {JSON.stringify({title,year,plot})}
            </pre>
        </form>
    )
}