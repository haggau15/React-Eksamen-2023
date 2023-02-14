import {render} from "react-dom";
import {ListMovies} from "../MovieApplication";
import * as React from "react";
import {createRoot} from "react-dom/client";

describe("movie pages", () => {
    it("Shows movies",()=> {
        const element=document.createElement("div");
        const root = createRoot(element);

        root.render(<ListMovies/>)
        expect(element.innerHTML).toMatchSnapshot();
        console.log(element.innerHTML);

    });
    it("User can add new movie",  ()=> {

    });
});