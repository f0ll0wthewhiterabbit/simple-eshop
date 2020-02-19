import { createAction } from 'redux-actions'

export const fetchProducts = createAction(
  'PRODUCTS/FETCH_PRODUCTS',
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
export const fetchProduct = createAction('PRODUCTS/FETCH_PRODUCT', id => ({ id }))
export const fetchProductSuccess = createAction('PRODUCTS/FETCH_PRODUCT_SUCCESS', product => ({
  product,
}))
export const fetchProductError = createAction('PRODUCTS/FETCH_PRODUCT_ERROR', error => ({
  error,
}))
export const fetchProductRating = createAction(
  'PRODUCTS/FETCH_PRODUCT_RATING',
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
export const setSelectedProducts = createAction(
  'PRODUCTS/SET_SELECTED_PRODUCTS',
  selectedProductsList => ({ selectedProductsList })
)
export const deleteProducts = createAction('PRODUCTS/DELETE_PRODUCTS')
export const deleteProductsSuccess = createAction(
  'PRODUCTS/DELETE_PRODUCTS_SUCCESS',
  deletedProducts => ({ deletedProducts })
)
export const deleteProductsError = createAction('PRODUCTS/DELETE_PRODUCTS_ERROR', error => ({
  error,
}))
export const changeProductRating = createAction('PRODUCTS/CHANGE_PRODUCT_RATING', ratingData => ({
  ratingData,
}))
export const changeProductRatingSuccess = createAction(
  'PRODUCTS/CHANGE_PRODUCT_RATING_SUCCESS',
  product => ({ product })
)
export const changeProductRatingError = createAction(
  'PRODUCTS/CHANGE_PRODUCT_RATING_ERROR',
  id => ({ id })
)
export const deleteProductRating = createAction('PRODUCTS/DELETE_PRODUCT_RATING', productId => ({
  productId,
}))
export const deleteProductRatingSuccess = createAction(
  'PRODUCTS/DELETE_PRODUCT_RATING_SUCCESS',
  product => ({ product })
)
export const deleteProductRatingError = createAction(
  'PRODUCTS/DELETE_PRODUCT_RATING_ERROR',
  id => ({ id })
)
export const addProduct = createAction(
  'PRODUCTS/ADD_PRODUCT',
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
export const startRatingLoading = createAction('PRODUCTS/START_RATING_LOADING', id => ({ id }))
export const editProduct = createAction(
  'PRODUCTS/EDIT_PRODUCT',
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
