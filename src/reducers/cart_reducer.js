import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  const { type, payLoad } = action
  const { cart } = state

  if (type === ADD_TO_CART) {
    const { id, color, stock, amount, name, price, images } = payLoad

    const tempItem = cart.find((product) => {
      return product.id === id + color
    })

    if (tempItem) {
      const tempCart = cart.map((cartItems) => {
        if (cartItems.id === id + color) {
          let newAmount = cartItems.amount + amount
          if (newAmount > stock) {
            newAmount = stock
          }
          return { ...cartItems, amount: newAmount }
        } else {
          return cartItems
        }
      })
      console.log(tempCart)
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: name,
        color: color,
        amount: amount,
        image: images[0].url,
        price: price,
        max: stock,
      }
      return { ...state, cart: [...cart, newItem] }
    }
  }

  if (type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = payLoad
    const tempCart = cart.map((product) => {
      if (product.id === id) {
        if (value === 'inc') {
          let newAmount = product.amount + 1
          if (newAmount > product.max) {
            newAmount = product.max
          }
          return { ...product, amount: newAmount }
        }

        if (value === 'dec') {
          let newAmount = product.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...product, amount: newAmount }
        }
      }
    })
    return { ...state, cart: tempCart }
  }

  if (type === CLEAR_CART) {
    return { ...state, cart: [] }
  }

  if (type === REMOVE_CART_ITEM) {
    const temp = cart.filter((product) => {
      return product.id !== payLoad
    })
    return { ...state, cart: temp }
  }

  if (type === COUNT_CART_TOTALS) {
    const { amount, price } = state.cart.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem
        const multiply = price * amount
        total.amount += amount
        total.price += multiply
        return total
      },
      {
        amount: 0,
        price: 0,
      }
    )

    console.log(amount, price)

    return {
      ...state,
      total_price: price,
      total_amount: amount,
    }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
