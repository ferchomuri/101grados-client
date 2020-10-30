import React, { Component } from "react";
import MovieDataService from "../../services/movie";
import { Link } from "react-router-dom";

export default class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveMovies = this.retrieveMovies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMovie = this.setActiveMovie.bind(this);

    this.state = {
      movies: [],
      currentMovie: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveMovies();
  }

  retrieveMovies() {
    MovieDataService.getAll()
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMovie();
    this.setState({
      currentMovie: null,
      currentIndex: -1
    });
  }

  setActiveMovie(movie,genre, synopsis, index) {
    this.setState({
      currentMovie: movie,
      currentGenre: genre,
      currentSynopsis: synopsis,
      currentIndex: index
    });
  }


  render() {
    const { movies, currentMovie, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <div className="input-group-append">
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de P&eacute;liculas</h4>

          <ul className="list-group">
            {movies &&
              movies.map((movie, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMovie(movie, index)}
                  key={index}
                >
                  {movie.name}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentMovie ? (
            <div>
              <h4>P&eacute;licula</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentMovie.name}
              </div>
              <div>
                <label>
                  <strong>Duraci&oacute;n:</strong>
                </label>{" "}
                {currentMovie.duration}
              </div>
              <div>
                <label>
                  <strong>G&eacute;nero:</strong>
                </label>{" "}
                {currentMovie.genre}
              </div>
              <div>
                <label>
                  <strong>Sinopsis:</strong>
                </label>{" "}
                {currentMovie.synopsis}
              </div>

              <Link
                to={"/movies/" + currentMovie.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecciona una Pel&iacute;cula</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}