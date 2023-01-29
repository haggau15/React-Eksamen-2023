import * as React from "react";
import {Route, Link, BrowserRouter, Routes, useNavigate} from "react-router-dom"
import { createRoot } from 'react-dom/client';
import {useState} from "react";

const MOVIES=[
    {
        title:"The matrix",
        plot:"A computer hacker learns from mysterious rebels about the true nature of his reality",
        year: "1999"
    },
    {
        title:"The boondock saints",
        plot:"Two Irish Catholic brothers become vigilantes and wipe out Boston's criminal underworld in the name of God",
        year: "1999"
    }];
const MOVIES2= [
    {
        title: "Don't look up",
        plot: "Impending disaster, but will politicians act?",
        year: 2021
    },
    {
        title: "Web development",
        plot: "Johannes Codes, everyone is confused",
        year: 2022
    },
]

function FrontPage() {
return(
     <div>
            <h1>Movie DB</h1>
            <ul>
                <li><Link to="/movies/new">New movie</Link></li>
                <li><Link to="/movies">All movies</Link></li>
            </ul>
        </div>
)
}

function ListMovies(movies){
    console.log(movies);
    return(
        <div >
            <h1>Movies</h1>
                    {movies.movies.map(m=>
                        <div key={m.title}>
                            <h2>{m.title} ({m.year}</h2>
                            <div> {m.plot}</div>
                        </div>)}
        </div>)
}

function NewMovie({onAddMovie}) {
    const [title,setTitle]=useState("");
    const [plot,setPlot]=useState("");
    const [year,setYear]=useState("");

    const navigate = useNavigate();
    function handleSubmit(e)
    {
        e.preventDefault();
        onAddMovie({plot,title,year});
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

function Application(){
        return (
            <BrowserRouter>
                <Routes >
                    <Route path="/" element={<FrontPage/>}/>
                    <Route path="/movies/new" element={<NewMovie onAddMovie={(m=> MOVIES.push(m))}/>}/>
                    <Route path="/movies" element={<ListMovies movies={MOVIES}/>}/>
                </Routes>
            </BrowserRouter>)

}


const container =     document.getElementById("app")
const root = createRoot(container);
root.render(<Application/>);
