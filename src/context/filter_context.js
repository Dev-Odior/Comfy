import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'
import filter_reducer from '../reducers/filter_reducer'

const initialState = {
  all_products: [],
  filtered_products: [],
  gridView: true,
  sort: 'a-z',
  filters: {
    search_input: '',
    category: 'all',
    company: 'all',
    color: 'all',
    max_price: 0,
    min_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext({})

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext().state
  const [state, dispatch] = useReducer(reducer, initialState)

  const viewToggler = (value) => {
    dispatch({ type: 'SET_VIEW', payLoad: value })
  }

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payLoad: products })
  }, [products])

  // sort fuctionallity
  const sortHandler = (event) => {
    const { value } = event.target
    dispatch({ type: UPDATE_SORT, payLoad: value })
  }

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS })
  }, [state.sort])

  //clearfilters
  const clearFilters = () => {
    console.log('woorking clear')
    dispatch({ type: CLEAR_FILTERS })
  }

  //filterHandler for all the filter functionality
  const filterHandler = (event) => {
    const { name, value, textContent, dataset, checked } =
      event.target

    let filterName = name
    let filterValue = value

    if (name === 'category') {
      filterValue = textContent
    }

    if (name === 'color') {
      const { color } = dataset
      filterValue = color
    }

    if (name === 'shipping') {
      filterValue = checked
    }

    dispatch({
      type: UPDATE_FILTERS,
      payLoad: { filterName, filterValue },
    })
  }

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
  }, [state.filters])

  const value = {
    state,
    viewToggler,
    dispatch,
    sortHandler,
    filterHandler,
    clearFilters,
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
