import './App.css';

import AddMovie from "./components/movie/add";
import Movie from "./components/actor/form";
import MovieList from "./components/movie/list";
import { Link, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/movies" className="navbar-brand">
            Fernando Murillo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/movies"} className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
      </nav>
      <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/movies/"]} render={()=> <MovieList />}/>
            <Route exact path="/add" render={()=> <AddMovie />}/>
            <Route path="/tutorials/:id" render={()=> <Movie />} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
