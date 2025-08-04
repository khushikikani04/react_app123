import React from 'react'

const moviecard = ({ movie :
    {title, vote_avarage, poster_path, release_date, original_language}
}) => {
  return (
    <div>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`:
    'no-movie.png'}/>
    </div>
  )
}

export default moviecard
