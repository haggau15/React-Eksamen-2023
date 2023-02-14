import * as React from "react";
import {Route, Link, BrowserRouter, Routes, useNavigate} from "react-router-dom"
import { createRoot } from 'react-dom/client';
import {useEffect, useState} from "react";
import {m} from "caniuse-lite/data/browserVersions";
import {ListMovies, NewMovie} from "./MovieApplication";

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



function Application(){
    const moviesAPI={
        onAddMovie: async (m) => {
            await fetch("/api/movies",{
                method:"POST",
                headers: {
                    "content-type": "application/json"
                },
                body:JSON.stringify(m)
            })
        },
        listMovies: async () => {
            const res = await fetch("/api/movies");
            return res.json();
        }
    }
        return (
            <BrowserRouter>
                <Routes >
                    <Route path="/" element={<FrontPage/>}/>
                    <Route path="/movies/new" element={<NewMovie moviesAPI={moviesAPI}/>}/>
                    <Route path="/movies" element={<ListMovies moviesAPI={moviesAPI}/>}/>
                </Routes>
            </BrowserRouter>)

}
const container = document.getElementById("app")
const root = createRoot(container);
root.render(<Application/>);
