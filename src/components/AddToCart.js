import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  // i would be needing a fuction to take all the details of the cart
  const { colors, stock, id } = product
  const [mainColor, setMainColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)
  const { addToCartHandler } = useCartContext()

  const increaseHandler = () => {
    console.log('working')
    if (amount < stock) {
      setAmount((prev) => {
        return prev + 1
      })
    } else {
      setAmount(stock)
    }
  }

  const decreaseHandler = () => {
    console.log('working')
    if (amount > 1) {
      setAmount((prev) => {
        return prev - 1
      })
    } else {
      setAmount(1)
    }
  }

  let singleProduct = { ...product, color: mainColor, amount }

  return (
    <Wrapper>
      <div className="colors">
        <span>colors:</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                onClick={() => setMainColor(color)}
                className={`${
                  mainColor === color
                    ? 'active color-btn'
                    : 'color-btn'
                }`}
                style={{ background: color }}
                key={index}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          increase={increaseHandler}
          decrease={decreaseHandler}
          amount={amount}
        />
        <Link
          className="btn"
          to="/cart"
          onClick={() => addToCartHandler(singleProduct)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
