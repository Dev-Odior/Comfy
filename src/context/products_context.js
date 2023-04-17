import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  openSideBar: false,
  product_loading: false,
  error: false,
  featured_products: [],
  products: [],
  single_product: {},
  singleProduct_loading: false,
  singleProduct_error: false,
}

const ProductsContext = React.createContext({
  state: {},
  dispatch: () => null,
})

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getProduct = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const { data } = await axios.get(url)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payLoad: data })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const getSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const { data } = await axios.get(url)
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payLoad: data })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    getProduct(url)
  }, [])

  const openSideBarHandler = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSideBarHandler = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const value = {
    state,
    dispatch,
    openSideBarHandler,
    closeSideBarHandler,
    getSingleProduct,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
