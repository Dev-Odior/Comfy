import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'
import { type } from '@testing-library/user-event/dist/type'

const initialState = {
  cart: [],
  total_amount: 0,
  total_price: 0,
  shipping_fee: 500,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCartHandler = (product) => {
    dispatch({ type: ADD_TO_CART, payLoad: product })
  }

  const toggleHandler = (id, value) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payLoad: { id, value },
    })
  }

  const clearCartHandler = () => {
    dispatch({ type: CLEAR_CART })
  }

  const removeItemHandler = (identity) => {
    dispatch({ type: REMOVE_CART_ITEM, payLoad: identity })
  }

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
  }, [state.cart])

  const value = {
    state,
    dispatch,
    addToCartHandler,
    toggleHandler,
    clearCartHandler,
    removeItemHandler,
  }
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
