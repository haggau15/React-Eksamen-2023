import express from "express";
export const movieRouter = new express.Router();

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

movieRouter.get("/api/movies",(req, res)=>{
    console.log("sdfdfggfd");
    res.json(MOVIES);
});