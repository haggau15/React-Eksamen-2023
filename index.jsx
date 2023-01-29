import * as React from "react";
import * as ReactDOM from "react-dom";
import {Route, Router, Link, BrowserRouter, Routes} from "react-router-dom"
class FrontPage extends React.Component {
    render() {
        return <div>
            <h1>Movie DB</h1>
            <ul>
                <li><Link to="/movies/new">List movies</Link></li>
                <li><Link to="/movies">All movies</Link></li>
            </ul>
        </div>;
    }
}

class Application extends React.Component {
    render() {
        return <BrowserRouter>
        <Routes >
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/movies/new" element={<h1>New movie</h1>}/>
            <Route path="/movies" element={<h1>Movies</h1>}/>
        </Routes>
        </BrowserRouter>

    }
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);