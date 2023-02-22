import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

async function onUpdateUser(user,username,password,department,role) {
    console.log(user,username,password,department,role);
    const res=await fetch("/api/user/", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({user, username,password,department,role})
    });
    console.log("res",res);
    //const {username,newUsername,newPassword,newDepartment,newRole}=req.body;
}

export function UpdateUser()
{
    const navigate=useNavigate();
    const [user,setUser]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const [role,setRole]=        useState("");
    const [department,setDepartment]=useState("");

    useEffect(()=>{
        getUser();
        async function getUser(){ const res = (await fetch("/api/user/current")).json().then(response =>{
            setUser(response.temp.name);
            setPassword(response.temp.password);
            setUsername(response.temp.name);
            setRole(response.temp.role);
            setDepartment(response.temp.department);
        })}
       },[]);
    if(!user)
    {
        return (<div>loading...</div>)
    }
    async function handleSubmit(e)
    {
        e.preventDefault();
        navigate("/");
        await onUpdateUser(user,username,password,department,role);
    }
    async function handleOnclick(e){
        e.preventDefault();
        navigate("/");
    }
    return (<>
            <button onClick={handleOnclick}>Return</button>
            <h1> Change the values you want to update</h1>
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