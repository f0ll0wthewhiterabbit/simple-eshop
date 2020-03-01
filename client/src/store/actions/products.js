import { createAction } from 'redux-actions'

export const fetchProductsRequest = createAction(
  'PRODUCTS/FETCH_PRODUCTS_REQUEST',
  (page, itemsPerPage, searchText, filter) => ({
    page,
    itemsPerPage,
    searchText,
    filter,
  })
)
export const fetchProductsSuccess = createAction(
  'PRODUCTS/FETCH_PRODUCTS_SUCCESS',
  (productsList, totalAmount, currentPage, itemsPerPage, totalPages) => ({
    productsList,
    totalAmount,
    currentPage,
    itemsPerPage,
    totalPages,
  })
)
export const fetchProductsError = createAction('PRODUCTS/FETCH_PRODUCTS_ERROR', error => ({
  error,
}))

export const fetchProductRequest = createAction('PRODUCTS/FETCH_PRODUCT_REQUEST', id => ({ id }))
export const fetchProductSuccess = createAction('PRODUCTS/FETCH_PRODUCT_SUCCESS', product => ({
  product,
}))
export const fetchProductError = createAction('PRODUCTS/FETCH_PRODUCT_ERROR', error => ({
  error,
}))

export const fetchProductRatingRequest = createAction(
  'PRODUCTS/FETCH_PRODUCT_RATING_REQUEST',
  (productId, page, itemsPerPage) => ({
    productId,
    page,
    itemsPerPage,
  })
)
export const fetchProductRatingSuccess = createAction(
  'PRODUCTS/FETCH_PRODUCT_RATING_SUCCESS',
  (productRatingData, totalAmount, currentPage, itemsPerPage, totalPages) => ({
    productRatingData,
    totalAmount,
    currentPage,
    itemsPerPage,
    totalPages,
  })
)
export const fetchProductRatingError = createAction(
  'PRODUCTS/FETCH_PRODUCT_RATING_ERROR',
  error => ({
    error,
  })
)

export const deleteProductsRequest = createAction('PRODUCTS/DELETE_PRODUCTS_REQUEST')
export const deleteProductsSuccess = createAction(
  'PRODUCTS/DELETE_PRODUCTS_SUCCESS',
  deletedProducts => ({ deletedProducts })
)
export const deleteProductsError = createAction('PRODUCTS/DELETE_PRODUCTS_ERROR', error => ({
  error,
}))

export const changeProductRatingRequest = createAction(
  'PRODUCTS/CHANGE_PRODUCT_RATING_REQUEST',
  ratingData => ({
    ratingData,
  })
)
export const changeProductRatingSuccess = createAction(
  'PRODUCTS/CHANGE_PRODUCT_RATING_SUCCESS',
  product => ({ product })
)
export const changeProductRatingError = createAction(
  'PRODUCTS/CHANGE_PRODUCT_RATING_ERROR',
  id => ({ id })
)

export const deleteProductRatingRequest = createAction(
  'PRODUCTS/DELETE_PRODUCT_RATING_REQUEST',
  productId => ({
    productId,
  })
)
export const deleteProductRatingSuccess = createAction(
  'PRODUCTS/DELETE_PRODUCT_RATING_SUCCESS',
  product => ({ product })
)
export const deleteProductRatingError = createAction(
  'PRODUCTS/DELETE_PRODUCT_RATING_ERROR',
  id => ({ id })
)

export const addProductRequest = createAction(
  'PRODUCTS/ADD_PRODUCT_REQUEST',
  (productFormData, history, setFormSubmitting) => ({
    productFormData,
    history,
    setFormSubmitting,
  })
)
export const addProductSuccess = createAction('PRODUCTS/ADD_PRODUCT_SUCCESS', product => ({
  product,
}))
export const addProductError = createAction('PRODUCTS/ADD_PRODUCT_ERROR', error => ({ error }))

export const editProductRequest = createAction(
  'PRODUCTS/EDIT_PRODUCT_REQUEST',
  (id, changedFieldsFormData, history, setFormSubmitting) => ({
    id,
    changedFieldsFormData,
    history,
    setFormSubmitting,
  })
)
export const editProductSuccess = createAction('PRODUCTS/EDIT_PRODUCT_SUCCESS', product => ({
  product,
}))
export const editProductError = createAction('PRODUCTS/EDIT_PRODUCT_ERROR', error => ({ error }))

export const setProductsPerPage = createAction('PRODUCTS/SET_PRODUCTS_PER_PAGE', amount => ({
  amount,
}))

export const setProductsFilter = createAction('PRODUCTS/SET_PRODUCTS_FILTER', filter => ({
  filter,
}))

export const startProductsLoading = createAction('PRODUCTS/START_PRODUCTS_LOADING')

export const setProductsSearchQuery = createAction(
  'PRODUCTS/SET_PRODUCTS_SEARCH_QUERY',
  searchQuery => ({
    searchQuery,
  })
)

export const setSelectedProducts = createAction(
  'PRODUCTS/SET_SELECTED_PRODUCTS',
  selectedProductsList => ({ selectedProductsList })
)

export const startRatingLoading = createAction('PRODUCTS/START_RATING_LOADING', id => ({ id }))
