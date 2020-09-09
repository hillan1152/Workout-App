import React from 'react'

export const Pagination = ({ workoutsPerPage, totalWorkouts, paginate }) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalWorkouts / workoutsPerPage); i++){
    pageNumbers.push(i)
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => {
          return(
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link" href="javascript:void(0)" >
              {number}
            </a>
          </li>
          )
        })}
      </ul>
    </nav>
  )
}
