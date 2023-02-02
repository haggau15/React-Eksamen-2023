import express from "express";
const app = express();

app.get("/api/movies",(req,res)=>{
    res.json([
        {title:"Hello"}
    ])
})


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});