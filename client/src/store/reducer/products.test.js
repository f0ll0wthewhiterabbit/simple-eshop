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
    currentProduct: Record({
      id: '',
      title: '',
      description: '',
      price: null,
      imageName: '',
      tags: List(),
      rating: List(),
    })(),
    lastSearchQuery: '',
    isLoading: true,
    error: null,
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
    const recievedState = productsReducer(undefined, {})

    expect(recievedState.hashCode()).toBe(initialState.hashCode())
  })

  it('should start loading after [startProductsLoading] action', () => {
    const recievedState = productsReducer(undefined, startProductsLoading())

    expect(recievedState.isLoading).toBe(true)
  })

  it('should handle [fetchProductsSuccess] action', () => {
    const recievedState = productsReducer(
      undefined,
      fetchProductsSuccess(
        testProductsList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )

    expect(recievedState.data).toEqual(testProductsList)
    expect(recievedState.totalAmount).toBe(testTotalAmount)
    expect(recievedState.currentPage).toBe(testCurrentPage)
    expect(recievedState.itemsPerPage).toBe(testItemsPerPage)
    expect(recievedState.totalPages).toBe(testTotalPages)
    expect(recievedState.isLoading).toBe(false)
    expect(recievedState.error).toBe(initialState.error)
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
    const recievedState = productsReducer(undefined, fetchProductSuccess(testCurrentProduct))

    expect(recievedState.currentProduct.id).toBe(testCurrentProduct.id)
    expect(recievedState.currentProduct.title).toBe(testCurrentProduct.title)
    expect(recievedState.currentProduct.description).toBe(testCurrentProduct.description)
    expect(recievedState.currentProduct.price).toBe(testCurrentProduct.price)
    expect(recievedState.currentProduct.imageName).toBe(testCurrentProduct.imageName)
    expect(recievedState.currentProduct.tags).toEqual(testCurrentProduct.tags)
    expect(recievedState.currentProduct.rating).toEqual(initialState.currentProduct.rating)
    expect(recievedState.isLoading).toBe(false)
    expect(recievedState.error).toBe(initialState.error)
  })

  it('should handle [fetchProductRatingSuccess] action', () => {
    const testProductRatingData = Record({
      id: '2',
      rating: List([4, 5, 6]),
    })()
    const recievedState = productsReducer(
      undefined,
      fetchProductRatingSuccess(
        testProductRatingData,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )

    expect(recievedState.currentProduct.id).toBe(testProductRatingData.id)
    expect(recievedState.currentProduct.rating).toEqual(testProductRatingData.rating)
    expect(recievedState.currentProduct.title).toBe(initialState.currentProduct.title)
    expect(recievedState.currentProduct.description).toBe(initialState.currentProduct.description)
    expect(recievedState.currentProduct.price).toBe(initialState.currentProduct.price)
    expect(recievedState.currentProduct.imageName).toBe(initialState.currentProduct.imageName)
    expect(recievedState.currentProduct.tags).toEqual(initialState.currentProduct.tags)
    expect(recievedState.totalAmount).toBe(testTotalAmount)
    expect(recievedState.currentPage).toBe(testCurrentPage)
    expect(recievedState.itemsPerPage).toBe(testItemsPerPage)
    expect(recievedState.totalPages).toBe(testTotalPages)
    expect(recievedState.isLoading).toBe(false)
    expect(recievedState.error).toBe(initialState.error)
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
    const recievedState = productsReducer(
      stateAfterFetchProducts,
      deleteProductsSuccess(deleteProductsIdsList)
    )
    const expectedUsersList = List([testProduct2])

    expect(recievedState.data).toEqual(expectedUsersList)
    expect(recievedState.totalAmount).toEqual(testTotalAmount - deleteProductsIdsList.size)
    expect(recievedState.isLoading).toEqual(false)
    expect(recievedState.error).toEqual(initialState.error)
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
    const recievedState = productsReducer(
      stateAfterFetchProducts,
      addProductSuccess(newTestProduct)
    )

    expect(recievedState.data.get(3)._id).toEqual(newTestProduct._id)
    expect(recievedState.data.get(3).title).toEqual(newTestProduct.title)
    expect(recievedState.isLoading).toEqual(false)
    expect(recievedState.error).toEqual(initialState.error)
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
    const recievedState = productsReducer(
      stateAfterFetchProducts,
      changeProductRatingSuccess(changedTestProduct)
    )

    const isProductInRatingsLoadingLIst =
      recievedState.ratingsLoadingList.findIndex(
        productId => productId === changedTestProduct._id
      ) !== -1
    const isProductInRatingsErrorLIst =
      recievedState.ratingsErrorList.findIndex(
        productId => productId === changedTestProduct._id
      ) !== -1

    expect(recievedState.data.get(2)._id).toEqual(changedTestProduct._id)
    expect(recievedState.data.get(2).title).toEqual(changedTestProduct.title)
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
    const recievedState = productsReducer(
      stateAfterFetchProducts,
      deleteProductRatingSuccess(changedTestProduct)
    )

    const isProductInRatingsLoadingLIst =
      recievedState.ratingsLoadingList.findIndex(
        productId => productId === changedTestProduct._id
      ) !== -1
    const isProductInRatingsErrorLIst =
      recievedState.ratingsErrorList.findIndex(
        productId => productId === changedTestProduct._id
      ) !== -1

    expect(recievedState.data.get(1)._id).toEqual(changedTestProduct._id)
    expect(recievedState.data.get(1).title).toEqual(changedTestProduct.title)
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
    const recievedState = productsReducer(
      stateAfterFetchProducts,
      editProductSuccess(changedTestProduct)
    )

    expect(recievedState.data.get(0)._id).toEqual(changedTestProduct._id)
    expect(recievedState.data.get(0).title).toEqual(changedTestProduct.title)
    expect(recievedState.isLoading).toEqual(false)
    expect(recievedState.error).toEqual(initialState.error)
    expect(recievedState.currentProduct.hashCode()).toEqual(initialState.currentProduct.hashCode())
  })

  it('should handle [fetchProductsError] action', () => {
    const recievedState = productsReducer(undefined, fetchProductsError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(false)
  })

  it('should handle [fetchProductError] action', () => {
    const recievedState = productsReducer(undefined, fetchProductError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(false)
  })

  it('should handle [fetchProductRatingError] action', () => {
    const recievedState = productsReducer(undefined, fetchProductRatingError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(false)
  })

  it('should handle [addProductError] action', () => {
    const recievedState = productsReducer(undefined, addProductError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(false)
  })

  it('should handle [editProductError] action', () => {
    const recievedState = productsReducer(undefined, editProductError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(false)
  })

  it('should handle [deleteProductsError] action', () => {
    const recievedState = productsReducer(undefined, deleteProductsError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(false)
  })

  it('should handle [changeProductRatingError] action', () => {
    const testProductId = '2'

    const recievedState = productsReducer(undefined, changeProductRatingError(testProductId))

    const isProductInRatingsLoadingLIst =
      recievedState.ratingsLoadingList.findIndex(productId => productId === testProductId) !== -1
    const isProductInRatingsErrorLIst =
      recievedState.ratingsErrorList.findIndex(productId => productId === testProductId) !== -1

    expect(isProductInRatingsLoadingLIst).toBe(false)
    expect(isProductInRatingsErrorLIst).toBe(true)
  })

  it('should handle [deleteProductRatingError] action', () => {
    const testProductId = '3'

    const recievedState = productsReducer(undefined, deleteProductRatingError(testProductId))

    const isProductInRatingsLoadingLIst =
      recievedState.ratingsLoadingList.findIndex(productId => productId === testProductId) !== -1
    const isProductInRatingsErrorLIst =
      recievedState.ratingsErrorList.findIndex(productId => productId === testProductId) !== -1

    expect(isProductInRatingsLoadingLIst).toBe(false)
    expect(isProductInRatingsErrorLIst).toBe(true)
  })

  it('should handle [setSelectedProducts] action', () => {
    const selectetProductsIds = ['1', '2']
    const recievedState = productsReducer(undefined, setSelectedProducts(selectetProductsIds))

    expect(recievedState.selected).toEqual(selectetProductsIds)
  })

  it('should handle [startRatingLoading] action', () => {
    const testProductId = '1'

    const recievedState = productsReducer(undefined, startRatingLoading(testProductId))

    const isProductInRatingsLoadingLIst =
      recievedState.ratingsLoadingList.findIndex(productId => productId === testProductId) !== -1

    expect(isProductInRatingsLoadingLIst).toBe(true)
  })

  it('should handle [setProductsPerPage] action', () => {
    const amount = 5
    const recievedState = productsReducer(undefined, setProductsPerPage(amount))

    expect(recievedState.itemsPerPage).toBe(amount)
  })

  it('should handle [setProductsFilter] action', () => {
    const recievedState = productsReducer(undefined, setProductsFilter(FIELDS.URL_RATINGS_FILTER))

    expect(recievedState.filter).toBe(FIELDS.URL_RATINGS_FILTER)
  })

  it('should handle [setProductsSearchQuery] action', () => {
    const testQuery = 'test'
    const recievedState = productsReducer(undefined, setProductsSearchQuery(testQuery))

    expect(recievedState.lastSearchQuery).toBe(testQuery)
  })
})
