import * as React from "react";
import {createRoot} from "react-dom/client";
import {ListUsers} from "../AllUsers";
import {act} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import * as ReactDOM from "react-dom";
require('jest-fetch-mock').enableMocks();
fetchMock.dontMock();
//import {Application} from "../index";
describe("Time management service", () => {
    it("Shows users",async () => {

        const element = document.createElement("div");
        const root = createRoot(element);
        await act(() => {
            root.render(<BrowserRouter><ListUsers/></BrowserRouter>);
        });
        expect(element.innerHTML).toMatchSnapshot();
    });
});
