import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  //deconstructed values from state
  const { sort, filtered_products, all_products, filters } = state

  // action deconstructed to reduce typing action
  const { type, payLoad } = action

  if (type === LOAD_PRODUCTS) {
    const all = [...payLoad]
    const filtered = [...payLoad]

    let max = all.map((product) => {
      return product.price
    })

    max = Math.max(...max)

    return {
      ...state,
      all_products: all,
      filtered_products: filtered,
      filters: { ...filters, max_price: max, price: max },
    }
  }

  if (type === 'SET_VIEW') {
    let toggleValue = true

    if (payLoad === 'grid') {
      toggleValue = true
    }
    if (payLoad === 'list') {
      toggleValue = false
    }
    return { ...state, gridView: toggleValue }
  }

  if (type === UPDATE_SORT) {
    return { ...state, sort: payLoad }
  }

  if (type === SORT_PRODUCTS) {
    //its best practise to spead value in another array to avoid wierd bugs
    const temp = [...filtered_products]

    //sort accending order (alphabetical)
    if (sort === 'a-z') {
      const products = temp.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      return { ...state, filtered_products: products }
    }

    // sort Decending order (alphabetical)
    if (sort === 'z-a') {
      const products = temp.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
      return { ...state, filtered_products: products }
    }

    //hightest-price
    if (sort === 'hightest-price') {
      const products = temp.sort((a, b) => {
        return b.price - a.price
      })
      return { ...state, filtered_products: products }
    }

    //lowest price
    if (sort === 'lowest-price') {
      const products = temp.sort((a, b) => {
        return a.price - b.price
      })

      return { ...state, filtered_products: products }
    }
  }

  //to update the filters
  if (type === UPDATE_FILTERS) {
    const { filterName, filterValue } = payLoad
    return {
      ...state,
      filters: { ...filters, [filterName]: filterValue },
    }
  }

  //to filter the products
  if (type === FILTER_PRODUCTS) {
    const {
      search_input,
      category,
      company,
      color,
      price,
      shipping,
    } = filters

    let temp = [...all_products]
    console.log(filters)

    //to filter by search
    if (search_input) {
      temp = temp.filter((product) => {
        return product.name.includes(search_input)
      })
    }

    //to filter by category
    if (category !== 'all') {
      temp = temp.filter((product) => {
        return product.category === category
      })
    }

    // to filter by company
    if (company !== 'all') {
      temp = temp.filter((product) => {
        return product.company === company
      })
    }

    if (color !== 'all') {
      console.log('colors')
      temp = temp.filter((product) => {
        return product.colors.includes(color)
      })
    }

    if (price) {
      temp = temp.filter((product) => {
        return product.price <= price
      })
    }

    if (shipping) {
      temp = temp.filter((product) => {
        return product.shipping <= shipping
      })
    }

    return { ...state, filtered_products: temp }
  }

  if (type === CLEAR_FILTERS) {
    const { max_price } = filters
    console.log(max_price)
    console.log('working')
    return {
      ...state,
      filters: {
        ...filters,
        search_input: '',
        category: 'all',
        company: 'all',
        color: 'all',
        min_price: 0,
        price: max_price,
        shipping: false,
      },
    }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
