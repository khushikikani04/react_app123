import React from 'react'

const moviecard = ({ movie :
    {title, vote_avarage, poster_path, release_date, original_language}
}) => {
  return (
    <div>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`:'no-movie.png'}
        alt={title}
        />
        <div className="mt-4">
          <h3>{title}</h3>

          <div className="content">
            <div className="rating">
              <img src='star.svg' alt='star Icon'  />

            </div>
          </div>
        </div>
    </div>
  )
}

export default moviecard


