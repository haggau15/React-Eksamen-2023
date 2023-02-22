import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

async function addUser(username,password,department,role) {
    await fetch("/api/user/", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({username,password,department,role})
    });
}

export function NewUser()
{
    const navigate=useNavigate();
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const [role,setRole]=        useState("");
    const [department,setDepartment]=useState("");

    async function handleSubmit(e)
    {
        e.preventDefault();
        navigate("/");
        await addUser(username,password,department,role);
    }
    async function handleOnclick(e){
        e.preventDefault();
        navigate("/");
    }
    return (<>
            <button onClick={handleOnclick}>Return</button>
            <h1> Enter the values for the new user</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: <input value={username} onChange={e=> setUsername(e.target.value)}/></label>
                </div>
                <div>
                    <label>Password: <input value={password} onChange={e=> setPassword(e.target.value)}/></label>
                </div>
                <div>
                    <label>Department: <input value={department} onChange={e=> setDepartment(e.target.value)}/></label>
                </div>
                <div>
                    <label>Role: <input value={role} onChange={e=> setRole(e.target.value)}/></label>
                </div>
                <pre>
                {JSON.stringify({username,password})}
            </pre>
                <div><button>Update</button></div>
            </form>
        </>
    );
}