import { Link } from "react-router-dom";

// Bu component'i class olarak da birakabilirdik ancak herhangi bir state tutmak gerekmediginden, propslari kullanarak bu component'i yapabildigimiz icin functional component olarak tasarladik.

const MovieList = (props) => {

    const truncateOverview = (string, maxLenght) => {
        if (!string) return null;
        if (string.length <= maxLenght) return string;
        return `${string.substring(0, maxLenght)} ...`;
        // Her bir card icerisindeki aciklama kisminin uzunlugunu kontrol etmek icin
    }

    return (
        <div className="row">

            {props.movies.map((movie, i) => (
                <div className="col-lg-4" key={i}>
                    <div className="card mb-4 shadow">
                        <img src={movie.imageURL} className="card-img-top" alt="sample movie" />
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <p className="card-text" > {truncateOverview(movie.overview, 125)} </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-md btn-outline-danger"
                                    onClick={() => props.delMovie(movie)}>
                                    Delete
                                </button>

                                <Link
                                    to={`edit/${movie.id}`}
                                    type="button"
                                    className="btn btn-outline-primary"
                                >
                                    Edit
                                </Link>

                                <h4><span className="badge bg-secondary">{movie.rating}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}
export default MovieList;