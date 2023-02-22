import * as React from "react";
import {json, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function ListUsers(){
    const navigate=useNavigate();
    const [users,setUsers]=useState();


    useEffect(()=>  {
        setValues();
        async function setValues(){
           (await fetch("http://localhost:23434/api/user/")).json().then(response =>{
                setUsers((response.temp))
            })}
    },[]);
    if(!users)
    {
        return (<div>loading...</div>)
    }
    async function handleOnclick(e){
        e.preventDefault();
        navigate("/");
    }
    return(
        <div >
            <button onClick={handleOnclick}>Return</button>
            <h1>Users</h1>
            {users.map(u=>
                <div key={u.name}>
                    <h2>{u.name}</h2>
                    <h3>{u.role} ({u.department})</h3>
                </div>)}
        </div>)
}
