import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ stars = 0, reviews }) => {

  const [full, half] = stars.toString().split('.')
  const temStars = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index}>
        {
          index < full ? <BsStarFill /> : index == full && half ? <BsStarHalf /> : <BsStar />

        }

      </span>)
  })




  return (
    <Wrapper>
      <div className="starsNum"> {stars}  </div>
      <div className="stars">
        {

          temStars
        }
      </div>
      <p className="reviews">
        {reviews} customers reviews
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  .starsNum{
   margin-top:-0.105rem;
    color: #ffb900;
    margin-right:0.5rem;
    font-size:1.1rem
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
