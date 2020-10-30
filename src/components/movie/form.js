import React, { Component } from "react";
import MovieDataService from "../../services/movie";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeSynopsis = this.onChangeSynopsis.bind(this);
    this.getMovie = this.getMovie.bind(this);

    this.state = {
      currentMovie: {
        id: null,
        name: "",
        duration: "",
        genre: "",
        synopsis:""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMovie(this.props.match.params.id);
  }

  onChangeMovie(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMovie: {
          ...prevState.currentMovie,
          name: name
        }
      };
    });
  }

  onChangeDuration(e) {
    const duration = e.target.value;
    
    this.setState(prevState => ({
      currentMovie: {
        ...prevState.currentMovie,
        duration: duration
      }
    }));
  }

  onChangeGenre(e) {
    const genre = e.target.value;
    
    this.setState(prevState => ({
      currentMovie: {
        ...prevState.currentMovie,
        genre: genre
      }
    }));
  }

  onChangeSynopsis(e) {
    const synopsis = e.target.value;
    
    this.setState(prevState => ({
      currentMovie: {
        ...prevState.currentSynopsis,
        synopsis: synopsis
      }
    }));
  }

  getMovie(id) {
    MovieDataService.get(id)
      .then(response => {
        this.setState({
          currentMovie: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMovie() {
    MovieDataService.update(
      this.state.currentMovie.id,
      this.state.currentMovie
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The movie was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentMovie } = this.state;

    return (
      <div>
        {currentMovie ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentMovie.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duraci&oacute;n</label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  value={currentMovie.duration}
                  onChange={this.onChangeDuration}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genre">G&eacute;nero</label>
                <input
                  type="text"
                  className="form-control"
                  id="genre"
                  value={currentMovie.genre}
                  onChange={this.onChangeGenre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="synopsis">Sinopsis</label>
                <input
                  type="text"
                  className="form-control"
                  id="synopsis"
                  value={currentMovie.synopsis}
                  onChange={this.onChangeSynopsis}
                />
              </div>

            </form>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}