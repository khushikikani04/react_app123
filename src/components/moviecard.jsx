import React from 'react'

const moviecard = ({ movie }) => {
  return (
    <div>
      <p key={movie.id} className='text-white'>{movie.title}</p>
    </div>
  )
}

export default moviecard
