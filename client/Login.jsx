import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";



async function onLogin(username, password) {
    await fetch("/api/login/", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({username, password})
    });
}

export function Login() {
    const navigate=useNavigate();
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");

    async function handleSubmit(e)
    {
        e.preventDefault();
        await onLogin(username,password);
        navigate("/");
    }
    async function handleOnclick(e){
        e.preventDefault();
        navigate("/");
    }
    return (<>
            <button onClick={handleOnclick}>Return</button>
            <h1> Log in </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: <input value={username} onChange={e=> setUsername(e.target.value)}/></label>
                </div>
                <div>
                    <label>Password: <input value={password} onChange={e=> setPassword(e.target.value)}/></label>
                </div>
                <pre>
                {JSON.stringify({username,password})}
            </pre>
                <div><button>Login</button></div>
            </form>
        </>
    );
}
export async function Logout()
{
    await fetch("/api/logout/", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
    });
}
/**
 * <div>Username: <input type="text" name="username" /></div>
 *                 <div>Password: <input type="password" name="password" /> </div>
 */