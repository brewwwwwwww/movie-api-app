import React from 'react'
import "./MovieCard.css"

const MovieCard = ({movie}) => {
  return (
    <a href={`http://www.themoviedb.org/movie/${movie.id}`} target='_blank' className='movie_card'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='movie_poster'/>

        <div className='movie_details'>
            <h3 className='movie_details_heading'>{movie.original_title}</h3>
            <div className='movie_date_rate'>
                <p>{movie.release_date}</p>
                <p>{movie.vote_average}</p>
            </div>
            <p className='movie_description'>{movie.overview.slice(0, 100) + "..."}</p>
        </div>
    </a>
  )
}

export default MovieCard