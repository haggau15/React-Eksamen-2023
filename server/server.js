import express from "express";
import * as path from "path";
const app = express();

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

app.get("/api/movies",(req,res)=>{
    res.json(MOVIES)
})
app.use(express.static(path.resolve("../dist")));

//In case page is refreshed
app.use((req,res)=>{
    res.sendFile(path.resolve("..","dist","index.html"));
})


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});