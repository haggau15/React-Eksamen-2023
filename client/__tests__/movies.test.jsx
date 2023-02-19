import {render} from "react-dom";
import {ListMovies} from "../MovieApplication";
import * as React from "react";
import {createRoot} from "react-dom/client";
//import {Application} from "../index";
describe("movie pages", () => {
    it("Shows movies",()=> {
        const element=document.createElement("div");
        const root = createRoot(element);
        root.render(<ListMovies/>);
        expect(element.innerHTML).toMatchSnapshot();
    });
});
