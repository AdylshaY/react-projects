import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import axios from "axios";
import AddMovie from "./AddMovie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditMovie from "./EditMovie";

class App extends React.Component {
    state = {
        movies: [],
        searchQuery: ""
    }

    componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        const response = await axios.get("http://localhost:3002/movies");
        this.setState({ movies: response.data })
    }

    deleteMovie = async (movie) => {
        axios.delete(`http://localhost:3002/movies/${movie.id}`);
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }

    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie)
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))
        this.getMovies();
    }

    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
        this.getMovies();
    }


    render() {
        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
            // son eklenen filmin en onde gosterilmesi icin
        })
        return (
            <BrowserRouter>
                <div className="container" style={{width: "70%"}}>
                    <Routes>

                        <Route path="/" element={
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchMovieProp={this.searchMovie} />
                                    </div>
                                </div>
                                <MovieList movies={filteredMovies} delMovie={this.deleteMovie} />
                            </React.Fragment>
                        }>
                        </Route>

                        <Route path="/add" element={
                            <AddMovie onAddMovie={(movie) => {
                                this.addMovie(movie)
                            }} />
                        } />

                        <Route path="/edit/:id" element={

                            <EditMovie onEditMovie={(id, movie) => {
                                this.editMovie(id, movie)
                            }} />
                        } />



                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;