import React from "react";
import {Link} from "react-router-dom";

class SearchBar extends React.Component {

    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="row my-5">
                    <div className="col-6 col-md-8 col-lg-9">
                        <input
                            onChange={this.props.searchMovieProp}
                            type="text"
                            className="form-control"
                            placeholder="Search a movie"
                        />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <Link
                            to={"/add"}
                            type="button"
                            className="btn btn-danger"
                            style={{float:'right'}}
                        >
                            Add Movie
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchBar;