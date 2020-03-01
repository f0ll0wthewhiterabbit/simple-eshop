import { Record, List } from 'immutable'

import productsReducer from './products'
import {
  fetchProductsSuccess,
  fetchProductsError,
  fetchProductSuccess,
  fetchProductError,
  fetchProductRatingSuccess,
  fetchProductRatingError,
  setSelectedProducts,
  deleteProductsSuccess,
  deleteProductsError,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProductSuccess,
  addProductError,
  editProductSuccess,
  editProductError,
  startRatingLoading,
  setProductsPerPage,
  setProductsFilter,
  startProductsLoading,
  setProductsSearchQuery,
} from '../actions'
import { PAGE_LIMITS, FIELDS } from '../../constants'
import { CurrentProductRecord } from './shared'

describe('Products reducer', () => {
  const initialState = Record({
    data: List(),
    totalAmount: 0,
    itemsPerPage: PAGE_LIMITS.CATALOG_DEFAULT,
    currentPage: 1,
    totalPages: 1,
    selected: List(),
    ratingsLoadingList: List(),
    ratingsErrorList: List(),
    filter: FIELDS.URL_NO_FILTER,
    currentProduct: new CurrentProductRecord(),
    lastSearchQuery: '',
    isLoading: true,
    error: '',
  })()
  const testProduct1 = Record({ _id: '1', title: 'First' })()
  const testProduct2 = Record({ _id: '2', title: 'Second' })()
  const testProduct3 = Record({ _id: '3', title: 'Third' })()
  const testProductsList = List([testProduct1, testProduct2, testProduct3])
  const testTotalAmount = 3
  const testCurrentPage = 1
  const testItemsPerPage = 2
  const testTotalPages = 2
  const testError = 'test error message'

  it('should return the initial state', () => {
    const receivedState = productsReducer(undefined, {})

    expect(receivedState.hashCode()).toBe(initialState.hashCode())
  })

  it('should start loading after [startProductsLoading] action', () => {
    const receivedState = productsReducer(undefined, startProductsLoading())

    expect(receivedState.isLoading).toBe(true)
  })

  it('should handle [fetchProductsSuccess] action', () => {
    const receivedState = productsReducer(
      undefined,
      fetchProductsSuccess(
        testProductsList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )

    expect(receivedState.data).toEqual(testProductsList)
    expect(receivedState.totalAmount).toBe(testTotalAmount)
    expect(receivedState.currentPage).toBe(testCurrentPage)
    expect(receivedState.itemsPerPage).toBe(testItemsPerPage)
    expect(receivedState.totalPages).toBe(testTotalPages)
    expect(receivedState.isLoading).toBe(false)
    expect(receivedState.error).toBe(initialState.error)
  })

  it('should handle [fetchProductSuccess] action', () => {
    const testCurrentProduct = Record({
      id: '3',
      title: 'Third',
      description: 'About Third',
      price: 99,
      imageName: 'testImageName.jpg',
      tags: List([1, 2, 3]),
    })()
    const receivedState = productsReducer(undefined, fetchProductSuccess(testCurrentProduct))

    expect(receivedState.currentProduct.id).toBe(testCurrentProduct.id)
    expect(receivedState.currentProduct.title).toBe(testCurrentProduct.title)
    expect(receivedState.currentProduct.description).toBe(testCurrentProduct.description)
    expect(receivedState.currentProduct.price).toBe(testCurrentProduct.price)
    expect(receivedState.currentProduct.imageName).toBe(testCurrentProduct.imageName)
    expect(receivedState.currentProduct.tags).toEqual(testCurrentProduct.tags)
    expect(receivedState.currentProduct.rating).toEqual(initialState.currentProduct.rating)
    expect(receivedState.isLoading).toBe(false)
    expect(receivedState.error).toBe(initialState.error)
  })

  it('should handle [fetchProductRatingSuccess] action', () => {
    const testProductRatingData = Record({
      id: '2',
      rating: List([4, 5, 6]),
    })()
    const receivedState = productsReducer(
      undefined,
      fetchProductRatingSuccess(
        testProductRatingData,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )

    expect(receivedState.currentProduct.id).toBe(testProductRatingData.id)
    expect(receivedState.currentProduct.rating).toEqual(testProductRatingData.rating)
    expect(receivedState.currentProduct.title).toBe(initialState.currentProduct.title)
    expect(receivedState.currentProduct.description).toBe(initialState.currentProduct.description)
    expect(receivedState.currentProduct.price).toBe(initialState.currentProduct.price)
    expect(receivedState.currentProduct.imageName).toBe(initialState.currentProduct.imageName)
    expect(receivedState.currentProduct.tags).toEqual(initialState.currentProduct.tags)
    expect(receivedState.totalAmount).toBe(testTotalAmount)
    expect(receivedState.currentPage).toBe(testCurrentPage)
    expect(receivedState.itemsPerPage).toBe(testItemsPerPage)
    expect(receivedState.totalPages).toBe(testTotalPages)
    expect(receivedState.isLoading).toBe(false)
    expect(receivedState.error).toBe(initialState.error)
  })

  it('should handle [deleteProductsSuccess] action', () => {
    const deleteProductsIdsList = List(['1', '3'])
    const stateAfterFetchProducts = productsReducer(
      undefined,
      fetchProductsSuccess(
        testProductsList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )
    const receivedState = productsReducer(
      stateAfterFetchProducts,
      deleteProductsSuccess(deleteProductsIdsList)
    )
    const expectedUsersList = List([testProduct2])

    expect(receivedState.data).toEqual(expectedUsersList)
    expect(receivedState.totalAmount).toEqual(testTotalAmount - deleteProductsIdsList.size)
    expect(receivedState.isLoading).toEqual(false)
    expect(receivedState.error).toEqual(initialState.error)
  })

  it('should handle [addProductSuccess] action', () => {
    const newTestProduct = Record({ _id: '4', title: 'Fourth' })()
    const stateAfterFetchProducts = productsReducer(
      undefined,
      fetchProductsSuccess(
        testProductsList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )
    const receivedState = productsReducer(
      stateAfterFetchProducts,
      addProductSuccess(newTestProduct)
    )

    expect(receivedState.data.get(3)._id).toEqual(newTestProduct._id)
    expect(receivedState.data.get(3).title).toEqual(newTestProduct.title)
    expect(receivedState.isLoading).toEqual(false)
    expect(receivedState.error).toEqual(initialState.error)
  })

  it('should handle [changeProductRatingSuccess] action', () => {
    const changedTestProduct = Record({ _id: '3', title: 'ChangedThird' })()
    const stateAfterFetchProducts = productsReducer(
      undefined,
      fetchProductsSuccess(
        testProductsList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )
    const receivedState = productsReducer(
      stateAfterFetchProducts,
      changeProductRatingSuccess(changedTestProduct)
    )

    const isProductInRatingsLoadingLIst =
      receivedState.ratingsLoadingList.findIndex(
        productId => productId === changedTestProduct._id
      ) !== -1
    const isProductInRatingsErrorLIst =
      receivedState.ratingsErrorList.findIndex(
        productId => productId === changedTestProduct._id
      ) !== -1

    expect(receivedState.data.get(2)._id).toEqual(changedTestProduct._id)
    expect(receivedState.data.get(2).title).toEqual(changedTestProduct.title)
    expect(isProductInRatingsLoadingLIst).toBe(false)
    expect(isProductInRatingsErrorLIst).toBe(false)
  })

  it('should handle [deleteProductRatingSuccess] action', () => {
    const changedTestProduct = Record({ _id: '2', title: 'ChangedSecond' })()
    const stateAfterFetchProducts = productsReducer(
      undefined,
      fetchProductsSuccess(
        testProductsList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )
    const receivedState = productsReducer(
      stateAfterFetchProducts,
      deleteProductRatingSuccess(changedTestProduct)
    )

    const isProductInRatingsLoadingLIst =
      receivedState.ratingsLoadingList.findIndex(
        productId => productId === changedTestProduct._id
      ) !== -1
    const isProductInRatingsErrorLIst =
      receivedState.ratingsErrorList.findIndex(
        productId => productId === changedTestProduct._id
      ) !== -1

    expect(receivedState.data.get(1)._id).toEqual(changedTestProduct._id)
    expect(receivedState.data.get(1).title).toEqual(changedTestProduct.title)
    expect(isProductInRatingsLoadingLIst).toBe(false)
    expect(isProductInRatingsErrorLIst).toBe(false)
  })

  it('should handle [editProductSuccess] action', () => {
    const changedTestProduct = Record({ _id: '1', title: 'ChangedFirst' })()
    const stateAfterFetchProducts = productsReducer(
      undefined,
      fetchProductsSuccess(
        testProductsList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )
    const receivedState = productsReducer(
      stateAfterFetchProducts,
      editProductSuccess(changedTestProduct)
    )

    expect(receivedState.data.get(0)._id).toEqual(changedTestProduct._id)
    expect(receivedState.data.get(0).title).toEqual(changedTestProduct.title)
    expect(receivedState.isLoading).toEqual(false)
    expect(receivedState.error).toEqual(initialState.error)
    expect(receivedState.currentProduct.hashCode()).toEqual(initialState.currentProduct.hashCode())
  })

  it('should handle [fetchProductsError] action', () => {
    const receivedState = productsReducer(undefined, fetchProductsError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [fetchProductError] action', () => {
    const receivedState = productsReducer(undefined, fetchProductError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [fetchProductRatingError] action', () => {
    const receivedState = productsReducer(undefined, fetchProductRatingError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [addProductError] action', () => {
    const receivedState = productsReducer(undefined, addProductError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [editProductError] action', () => {
    const receivedState = productsReducer(undefined, editProductError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [deleteProductsError] action', () => {
    const receivedState = productsReducer(undefined, deleteProductsError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [changeProductRatingError] action', () => {
    const testProductId = '2'

    const receivedState = productsReducer(undefined, changeProductRatingError(testProductId))

    const isProductInRatingsLoadingLIst =
      receivedState.ratingsLoadingList.findIndex(productId => productId === testProductId) !== -1
    const isProductInRatingsErrorLIst =
      receivedState.ratingsErrorList.findIndex(productId => productId === testProductId) !== -1

    expect(isProductInRatingsLoadingLIst).toBe(false)
    expect(isProductInRatingsErrorLIst).toBe(true)
  })

  it('should handle [deleteProductRatingError] action', () => {
    const testProductId = '3'

    const receivedState = productsReducer(undefined, deleteProductRatingError(testProductId))

    const isProductInRatingsLoadingLIst =
      receivedState.ratingsLoadingList.findIndex(productId => productId === testProductId) !== -1
    const isProductInRatingsErrorLIst =
      receivedState.ratingsErrorList.findIndex(productId => productId === testProductId) !== -1

    expect(isProductInRatingsLoadingLIst).toBe(false)
    expect(isProductInRatingsErrorLIst).toBe(true)
  })

  it('should handle [setSelectedProducts] action', () => {
    const selectedProductsIds = ['1', '2']
    const receivedState = productsReducer(undefined, setSelectedProducts(selectedProductsIds))

    expect(receivedState.selected).toEqual(selectedProductsIds)
  })

  it('should handle [startRatingLoading] action', () => {
    const testProductId = '1'

    const receivedState = productsReducer(undefined, startRatingLoading(testProductId))

    const isProductInRatingsLoadingLIst =
      receivedState.ratingsLoadingList.findIndex(productId => productId === testProductId) !== -1

    expect(isProductInRatingsLoadingLIst).toBe(true)
  })

  it('should handle [setProductsPerPage] action', () => {
    const amount = 5
    const receivedState = productsReducer(undefined, setProductsPerPage(amount))

    expect(receivedState.itemsPerPage).toBe(amount)
  })

  it('should handle [setProductsFilter] action', () => {
    const receivedState = productsReducer(undefined, setProductsFilter(FIELDS.URL_RATINGS_FILTER))

    expect(receivedState.filter).toBe(FIELDS.URL_RATINGS_FILTER)
  })

  it('should handle [setProductsSearchQuery] action', () => {
    const testQuery = 'test'
    const receivedState = productsReducer(undefined, setProductsSearchQuery(testQuery))

    expect(receivedState.lastSearchQuery).toBe(testQuery)
  })
})
