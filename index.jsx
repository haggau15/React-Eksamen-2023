import * as React from "react";
import * as ReactDOM from "react-dom";
import {Route, Router, Link, BrowserRouter, Routes} from "react-router-dom"

const movies=[
    {
        title:"The matrix",
        plot:"A computer hacker learns from mysterious rebels about the true nature of his reality",
        year: 1999
    },
    {
        title:"The boondock saints",
        plot:"Two Irish Catholic brothers become vigilantes and wipe out Boston's criminal underworld in the name of God",
        year: 1999
    }
];

class FrontPage extends React.Component {
    render() {
        return <div>
            <h1>Movie DB</h1>
            <ul>
                <li><Link to="/movies/new">New movie</Link></li>
                <li><Link to="/movies">All movies</Link></li>
            </ul>
        </div>;
    }
}

class ListMovies extends React.Component {
    render() {
        return <div>
            <h1>Movies</h1>
                    {movies.map(m=>
                        <div>
                            <h2>{m.title} ({m.year}</h2>
                            <div> {m.plot}</div>
                        </div>
                            )

                    }



        </div>;
    }
}

class Application extends React.Component {
    render() {
        return <BrowserRouter>
        <Routes >
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/movies/new" element={<h1>New movie</h1>}/>
            <Route path="/movies" element={<ListMovies/>}/>
        </Routes>
        </BrowserRouter>

    }
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);