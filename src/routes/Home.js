import React, {useEffect, useState} from "react";
import axios from "axios";
import Movie from "../components/Movie";
import './Home.css';
import Spinner from "../assets/images/Spinner@1x-1.0s-200px-200px.gif"

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  }

  getMovies = async () => {
    const {
      data: {
        data: {movies},
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating')
    this.setState({ movies, isLoading: false })
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <h3>잠시만 기다려주세요.</h3>
            <img src={Spinner} alt="로딩" width="10%" />
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie 
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    )
  }
}

export default Home;
