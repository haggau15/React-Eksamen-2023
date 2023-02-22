import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function DeleteUser() {

    const navigate = useNavigate();
    const [username,setUsername]=useState("");

    async function deleteUser(name) {
        await fetch("/api/user/", {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({name})
        });
    }

    async function handleOnclick(e) {
        e.preventDefault();
        navigate("/");
    }
    async function handleSubmit(e) {
        e.preventDefault();
        navigate("/");
        await deleteUser(username);
    }
    return (
        <>
            <button onClick={handleOnclick}>Return</button>
            <h1> Change the values you want to update</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: <input value={username} onChange={e => setUsername(e.target.value)}/></label>
                </div>
                <pre>
                {JSON.stringify({username})}
                </pre>
                <div>
                    <button>Delete</button>
                </div>
            </form>
        </>
    );
}
