import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditMovie(props) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [movie, setMovie] = useState({
        name: "",
        rating: "",
        overview: "",
        imageURL: ""
    })

    useEffect(async () => {
        // console.log(id);
        const response = await axios.get(`http://localhost:3002/movies/${id}`)
        setMovie({
            name: response.data.name,
            rating: response.data.rating,
            overview: response.data.overview,
            imageURL: response.data.imageURL
        })
        // console.log(movie)
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = movie.name;
        const rating = movie.rating;
        const overview = movie.overview;
        const imageURL = movie.imageURL;

        const updatedMovie = {
            name: name,
            rating: rating,
            overview: overview,
            imageURL: imageURL
        }
        props.onEditMovie(id, updatedMovie);

        navigate('/');
    }

    const onInputChange = (event) => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="container">
            <form className="mt-5" onSubmit={handleFormSubmit}>
                <input className="form-control my-2" id="disabledInput" type="text" placeholder="Edit The Form To Update A Movie.." disabled />
                <div className="row">
                    <div className=" col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            value={movie.name}
                            onChange={onInputChange} />
                    </div>
                    <div className=" col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input
                            type="text"
                            className="form-control"
                            name="rating"
                            value={movie.rating}
                            onChange={onInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className=" col-md-12 my-2">
                        <label htmlFor="inputImage">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imageURL"
                            value={movie.imageURL}
                            onChange={onInputChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea
                            className="form-control"
                            name="overview"
                            rows="5"
                            value={movie.overview}
                            onChange={onInputChange} />
                    </div>
                </div>
                <input type="submit" className="btn btn-success btn-block my-2" value="Update Movie" />
            </form>
        </div>
    )
}

export default EditMovie;