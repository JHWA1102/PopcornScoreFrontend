import React from "react";
import propTypes from "prop-types";
import './Movie.css';
import { Link } from "react-router-dom";

function Movie({ id, title, year, summary, poster, genres }) {
    return (
        <div className="movie">
        <Link 
          to="/detail" 
          state={{ 
            id, 
            title: title, 
            year, 
            summary, 
            poster, 
            genres 
          }}
        >
          <img src={poster} alt={title} title={title} />
          <div className="movie__data">
            <h3 className="movie__title">{title}</h3>
            <h5 className="movie__year">{year}</h5>
            <p className="movie__summary">{summary.slice(0, 180)}...</p>
            <ul className="genres">
              {genres.map((genre, index) => (
                <li key={index} className="genres__genre">{genre}</li>
              ))}
            </ul>
          </div>
        </Link>
      </div>
    )
}

Movie.propTypes = { 
    title: propTypes.string.isRequired,
    year: propTypes.number.isRequired,
    summary: propTypes.string.isRequired,
    poster: propTypes.string.isRequired,
    genres: propTypes.arrayOf(propTypes.string).isRequired,
}

export default Movie;