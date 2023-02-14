import express from "express";
import * as path from "path";
import * as bodyParser from "express";
const app = express();

const MOVIES=[
    {
        title:"The Obama matrix",
        plot:"A computer hacker learns from mysterious rebels about the true nature of his reality",
        year: "1999"
    },
    {
        title:"The boondock saintsssdss",
        plot:"Two Irish Catholic brothers become vigilantes and wipe out Boston's criminal underworld in the name of God",
        year: "1999"
    }];

app.use(bodyParser.json());


app.get("/api/movies",(req,res)=>{
    res.json(MOVIES)
    console.log("sdfdsfdssdf",MOVIES);

})

app.post("/api/movies",(req,res)=>{
    console.log("POST:",MOVIES);
    const {title,plot,year}=req.body;
    MOVIES.push({title,plot,year});
    res.sendStatus(200);
});

app.use(express.static(path.resolve("../client/dist")));

app.use((req,res)=>{
    res.sendFile(path.resolve("..","client","dist","index.html"));
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});