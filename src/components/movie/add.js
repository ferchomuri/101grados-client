import React, { Component } from "react";
import MovieDataService from "../../services/movie";

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeSynopsis = this.onChangeSynopsis.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.newMovie = this.newMovie.bind(this);

    this.state = {
      id: null,
      name: "",
      duration: "",
      genre:"",
      synopsis:"",
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value
    });
  }

  onChangeSynopsis(e) {
    this.setState({
      synopsis: e.target.value
    });
  }

  saveMovie() {
    var data = {
      name: this.state.name,
      duration: this.state.duration,
      genre: this.state.genre,
      synopsis: this.state.synopsis
    };

    MovieDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          duration: response.data.duration,
          genre: response.data.genre,
          synopsis: response.data.synopsis,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      name: "",
      duration: "",
      genre:"",
      synopsis:"",
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newMovie}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="duration">Duraci&oacute;n</label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  required
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  name="duration"
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre">G&eacute;ner</label>
                <input
                  type="text"
                  className="form-control"
                  id="genre"
                  required
                  value={this.state.genre}
                  onChange={this.onChangeGenre}
                  name="genre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="synopsis">Sinopsis</label>
                <input
                  type="text"
                  className="form-control"
                  id="synopsis"
                  required
                  value={this.state.synopsis}
                  onChange={this.onChangeSynopsis}
                  name="synopsis"
                />
              </div>
  
              <button onClick={this.saveMovie} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
  }