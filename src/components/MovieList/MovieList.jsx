import React, { useEffect, useState } from "react";
import _ from "lodash"
import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = ({type, title}) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc"
  })

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if(sort.by !== "dafault"){
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order])
      setFilterMovies(sortedMovies)
    }
  }, [sort])

  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=a3eedb5e9fc365616f8f4cb4dbaecd75`
    );
    const data = await res.json();
    setMovies(data.results);
    setFilterMovies(data.results);
  };

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  const handleSort = e => {
    const {name, value} = e.target
    setSort(prev => ({...prev, [name]: value}))
  }

  return (
    <section className="movie_list" id={type}>
      <header className="movie_list_header">
        <h2 className="movie_list_heading">{title}</h2>

        <div className="movie_list_fs">
          <FilterGroup minRating={minRating} handleFilter={handleFilter} ratings = {[8, 7, 6]}/>

          <select name = "by" onChange={handleSort} value={sort.by} className="movie_sorting">
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select name="order" onChange={handleSort} value={sort.order} className="movie_sorting">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
