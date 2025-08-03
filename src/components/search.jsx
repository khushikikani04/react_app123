import REACT from 'react'

const search = ({searchTerm, setsearchTerm}) => {
    return(
        <div className="search">
            <div>
                <img src='search.svg' alt='search' />

                <input
                   type='text'
                   placeholder='search through thousands of movies'
                   value={searchTerm}
                   onChange={(event) => setsearchTerm (event.target.value)}
                />
                   
            </div>
        </div>
    )
}
export default search