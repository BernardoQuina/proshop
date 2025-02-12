import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text }) => {
  return (
    <div className={value >= 4.5 ? 'rating fiveStar' : 'rating'}>
      <span>
        <i
          className={
            value >= 1
            ? 'fas fa-star'
            : value >= 0.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 2
            ? 'fas fa-star'
            : value >= 1.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 3
            ? 'fas fa-star'
            : value >= 2.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 4
            ? 'fas fa-star'
            : value >= 3.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 5
            ? 'fas fa-star'
            : value >= 4.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
          }
        ></i>
      </span>
      <span style={{color: '#55595c'}}>{text && ' ' + text}</span>
    </div>
  )
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
}

export default Rating
