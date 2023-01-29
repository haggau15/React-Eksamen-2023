import * as React from "react";
import * as ReactDOM from "react-dom";
import {Route, Link, BrowserRouter, Routes} from "react-router-dom"
import { createRoot } from 'react-dom/client';

const MOVIES=[
    {
        title:"The matrix",
        plot:"A computer hacker learns from mysterious rebels about the true nature of his reality",
        year: 1999,
    },
    {
        title:"The boondock saints",
        plot:"Two Irish Catholic brothers become vigilantes and wipe out Boston's criminal underworld in the name of God",
        year: 1999,
    },
];

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

function Application(){
        return (
            <BrowserRouter>
                <Routes >
                    <Route path="/" element={<FrontPage/>}/>
                    <Route path="/movies/new" element={<h1>New movie</h1>}/>
                    <Route path="/movies" element={<ListMovies movies={MOVIES}/>}/>
                </Routes>
            </BrowserRouter>)

}


const container =     document.getElementById("app")
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Application/>);
