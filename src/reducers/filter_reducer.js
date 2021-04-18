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
  if (action.type === LOAD_PRODUCTS) {
    const maxPrice = Math.max(...action.payload.map((product) => {
      return product.price
    }))

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
    }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload

    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters
    let tempProducts = [...all_products]
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category
      })
    }
    if (company !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company
      })
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.includes(color)
      })
    }
    tempProducts = tempProducts.filter((product) => {
      return product.price <= price
    })
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping
      })
    }

    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProduct = [...filtered_products]
    if (sort === 'price-lowest') {
      tempProduct = tempProduct.sort((a, b) => {
        return a.price - b.price
      })
    }
    if (sort === 'price-highest') {
      tempProduct = tempProduct.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (sort === 'name-a') {
      tempProduct = tempProduct.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProduct = tempProduct.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProduct }
  }


  if (action.type === CLEAR_FILTERS) {
    return {
      ...state, filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',

        price: state.filters.max_price,
        shipping: false,
      }
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
