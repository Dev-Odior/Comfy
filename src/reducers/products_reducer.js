import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  const { type, payLoad } = action

  if (type === SIDEBAR_OPEN) {
    return { ...state, openSideBar: true }
  }

  if (type === SIDEBAR_CLOSE) {
    return { ...state, openSideBar: false }
  }

  if (type === GET_PRODUCTS_BEGIN) {
    return { ...state, product_loading: true }
  }

  if (type === GET_PRODUCTS_SUCCESS) {
    const featured = payLoad.filter((each) => {
      return each.featured === true
    })
    return {
      ...state,
      products: payLoad,
      product_loading: false,
      error: false,
      featured_products: featured,
    }
  }

  if (type === GET_PRODUCTS_ERROR) {
    return {
      ...state,
      product_loading: false,
      error: true,
    }
  }

  if (type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      singleProduct_loading: true,
      singleProduct_error: false,
    }
  }
  if (type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      singleProduct_error: true,
      singleProduct_loading: false,
    }
  }
  if (type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product: payLoad,
      singleProduct_error: false,
      singleProduct_loading: false,
    }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
