import express from "express";
import * as path from "path";
import * as bodyParser from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
export const logoutPath = new express.Router();
export const loginPath = new express.Router();
export const usersPath = new express.Router();
export const userPath = new express.Router();

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/user/current",userPath);
app.use("/api/logout",logoutPath);
app.use("/api/login",loginPath);
app.use("/api/user",usersPath);

const testUsers=[
    {
        role: "employee",
        name: "john smith",
        department: "accounting",
        password: "password123"
    },
    {
        role: "manager",
        name: "john doe",
        department: "it",
        password: "123"
    }
];
const mongoClient = new MongoClient(process.env.MONGO_DB_URL);


//Adds new user
usersPath.post("/",async(req,res)=>{
    const {username,password,department,role}=req.body;
    console.log(username,password,department,role);
    const temp = await mongoClient.db("eksamen").collection("users").insertOne(
        {
                "role": role,
                "name": username,
                "department": department,
                "password": password
            });
    res.sendStatus(200);

});
//Returns all users in the database
usersPath.get("/",async (req, res)=> {
    const temp = await mongoClient.db("eksamen").collection("users").find({}).toArray();
    res.json({temp});
});
//Returns currently logged in user
userPath.get("/",async (req, res)=> {
    const {username} = req.signedCookies;
    console.log("Username:", username);
    if (!username) {
        res.sendStatus(400);
    } else {
        const temp = await mongoClient.db("eksamen").collection("users").findOne({ "name": username });
        console.log("tmp",temp);
        res.json({temp});
    }
});

//Deletes a user
usersPath.delete("/",async(req,res)=>{
    const {username}=req.body;
    console.log("Delete",username);
    await mongoClient.db("eksamen").collection("users").deleteOne({ "name": username });
    res.sendStatus(200);
});

//Logs in a user
loginPath.post("/", (req, res) => {
    const { password, username } = req.body;
    mongoClient.connect().then(async ()=>{
        console.log("Connected to mongo db");
        const user = await mongoClient.db("eksamen").collection("users").find({"name":username,"password":password}).toArray();
        if (user.toString()===""){
            res.sendStatus(401);
        }else {
            res.cookie("username", username, {signed: true}).redirect("/");
        }
    });
});

//Updates a user
usersPath.put("/", async(req,res)=>{
    const {user,username,password,department,role}=req.body;
    console.log(user);
    const temp = await mongoClient.db("eksamen").collection("users").updateOne({ "name": user },
        {  $set: {
                "role": role,
                "name": username,
                "department": department,
                "password": password
            }});
    res.cookie("username", username, {signed: true}).redirect("/");

});

//Logs out user
logoutPath.post("/", (req, res) => {
    res.cookie("username", null, {signed: false})
        .redirect("/");

});

loginPath.get("/",(req, res)=> {
    const {username} = req.signedCookies;
    if (!username) {
        res.sendStatus(400);
    } else {
        res.json({username});
    }
});

app.use(express.static(path.resolve("../client/dist")));

app.use((req,res)=>{
    res.sendFile(path.resolve("..","client","dist","index.html"));
})

const server = app.listen(process.env.PORT || 3000, () =>  {
    console.log(`Server started on http://localhost:${server.address().port}`);
});