import express from "express";
import * as path from "path";
import * as bodyParser from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import {movieRouter} from "./MovieRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());


const mongoClient = new MongoClient(process.env.MONGO_DB_URL);


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

export function MovieAPI()
{
    let router = new express.Router();

    router.get('/',(req, res)=>{
        res.json(MOVIES);
        next();
    });
    console.log("Path",app.locals);
    return router;
}
app.post("/api/movies",(req,res)=>{
    const {title,plot,year}=req.body;
    MOVIES.push({title,plot,year});
    res.sendStatus(200);
});

app.get("/api/movies",(req, res)=>{
    mongoClient.connect().then(async ()=>{
        console.log("Connected to mongo db");
        const temp = await mongoClient.db("eksamen").collection("movies").find({}).toArray();
        res.json(temp);
    });

});

//app.use("/api/movies/",MovieAPI);

app.use(express.static(path.resolve("../client/dist")));

app.use((req,res)=>{
    res.sendFile(path.resolve("..","client","dist","index.html"));
})





const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});