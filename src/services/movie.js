import http from "../http";

class MovieDataService {
  getAll() {
    return http.get("/movie/");
  }

  get(id) {
    return http.get(`/movie/${id}`);
  }

  create(data) {
    return http.post("/movie", data);
  }

  update(id, data) {
    return http.put(`/movie/${id}`, data);
  }

}

export default new MovieDataService();