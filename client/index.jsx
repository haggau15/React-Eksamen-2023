import * as React from "react";
import {Route, Link, BrowserRouter, Routes} from "react-router-dom"
import { createRoot } from 'react-dom/client';

import {ListMovies, NewMovie} from "./MovieApplication";
import {UpdateUser} from "./UpdateUser";
import {Login, Logout} from "./Login";
import {DeleteUser} from "./DeleteUser";
import {ListUsers} from "./AllUsers";
import {NewUser} from "./NewUser";

function FrontPage() {
return(
     <div>
            <h1>Movie DB</h1>
                <div><Link to="/login">Log in</Link></div>
                <div><Link to="/user/update">Update user</Link></div>
                <div><Link to="/user/delete">Delete user</Link></div>
                <div><Link to="/user/all">All users</Link></div>
                <div><Link to="/user/new">Add new user</Link></div>

         <div><button onClick={Logout}>Logout</button></div>
        </div>
)
}

export function Application(){
    const moviesAPI={
        onAddMovie: async (m) => {
            await fetch("/api/movies/",{
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
                    <Route path="/user/update" element={<UpdateUser/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/user/delete" element={<DeleteUser/>}/>
                    <Route path="/user/all" element={<ListUsers/>}/>
                    <Route path="/user/new" element={<NewUser/>}/>
                </Routes>
            </BrowserRouter>)

}
const container = document.getElementById("app")
const root = createRoot(container);
root.render(<Application/>);
