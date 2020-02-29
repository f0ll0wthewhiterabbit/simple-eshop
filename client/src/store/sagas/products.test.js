import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { select } from 'redux-saga/effects'
import { List } from 'immutable'

import API from '../../utils/api'
import {
  startProductsLoading,
  fetchProductsSuccess,
  fetchProductsError,
  fetchProductSuccess,
  fetchProductError,
  fetchProductRatingSuccess,
  fetchProductRatingError,
  startRatingLoading,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProductSuccess,
  addProductError,
  editProductSuccess,
  editProductError,
  closeModal,
  deleteProductsError,
  deleteProductsSuccess,
  setSelectedProducts,
} from '../actions'
import {
  getSelectedProducts,
  handleFetchProducts,
  handleFetchProduct,
  handleFetchProductRating,
  handleChangeProductRating,
  handleDeleteProductRating,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProducts,
} from './products'
import { PAGE_PATHS } from '../../constants'

jest.mock('../../utils/convertToRecord', () => jest.fn(() => [1, 2, 3]))

describe('Products sagas', () => {
  describe('fetchProducts', () => {
    const action = { payload: { page: 1, itemsPerPage: 10 } }

    it('should handle', () => {
      const testResponse = {
        data: {
          page: 1,
          perPage: 10,
          total: 7,
          totalPages: 1,
          data: [1, 2, 3],
        },
      }
      const {
        total: totalAmount,
        page: currentPage,
        perPage: itemsPerPage,
        totalPages,
      } = testResponse.data
      const productsList = testResponse.data.data

      return expectSaga(handleFetchProducts, action)
        .provide([[matchers.call.fn(API.get), testResponse]])
        .put(startProductsLoading())
        .put(fetchProductsSuccess(productsList, totalAmount, currentPage, itemsPerPage, totalPages))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Products data not recieved!'

      return expectSaga(handleFetchProducts, action)
        .provide([[matchers.call.fn(API.get), throwError(error)]])
        .put(startProductsLoading())
        .put(fetchProductsError(errorMessage))
        .run()
    })
  })

  describe('fetchProduct', () => {
    const action = { payload: { id: '1' } }

    it('should handle', () => {
      const testResponse = {
        data: {
          id: '1',
          title: 'testTitle',
          description: 'testDescription',
          price: 99,
          imageName: 'testImageName',
          tags: ['foo', 'bar'],
        },
      }

      return expectSaga(handleFetchProduct, action)
        .provide([[matchers.call.fn(API.get), testResponse]])
        .put(startProductsLoading())
        .put(fetchProductSuccess([1, 2, 3]))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Product not recieved!'

      return expectSaga(handleFetchProduct, action)
        .provide([[matchers.call.fn(API.get), throwError(error)]])
        .put(startProductsLoading())
        .put(fetchProductError(errorMessage))
        .run()
    })
  })

  describe('fetchProductRating', () => {
    const action = { payload: { productId: '1', page: 1, itemsPerPage: 10 } }

    it('should handle', () => {
      const testResponse = {
        data: {
          page: 1,
          perPage: 10,
          total: 7,
          totalPages: 1,
          data: { id: '1', title: 'testTitle', rating: 4 },
        },
      }
      const {
        total: totalAmount,
        page: currentPage,
        perPage: itemsPerPage,
        totalPages,
      } = testResponse.data
      const productRatingData = [1, 2, 3]

      return expectSaga(handleFetchProductRating, action)
        .provide([[matchers.call.fn(API.get), testResponse]])
        .put(startProductsLoading())
        .put(
          fetchProductRatingSuccess(
            productRatingData,
            totalAmount,
            currentPage,
            itemsPerPage,
            totalPages
          )
        )
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Product rating not recieved!'

      return expectSaga(handleFetchProductRating, action)
        .provide([[matchers.call.fn(API.get), throwError(error)]])
        .put(startProductsLoading())
        .put(fetchProductRatingError(errorMessage))
        .run()
    })
  })

  describe('changeProductRating', () => {
    const action = {
      payload: {
        ratingData: {
          productId: '1',
          userRating: 5,
        },
      },
    }
    const { productId } = action.payload.ratingData

    it('should handle', () => {
      return expectSaga(handleChangeProductRating, action)
        .provide([[matchers.call.fn(API.patch), [1, 2, 3]]])
        .put(startRatingLoading(productId))
        .put(changeProductRatingSuccess([1, 2, 3]))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')

      return expectSaga(handleChangeProductRating, action)
        .provide([[matchers.call.fn(API.patch), throwError(error)]])
        .put(startRatingLoading(productId))
        .put(changeProductRatingError(productId))
        .run()
    })
  })

  describe('deleteProductRating', () => {
    const action = { payload: { productId: '1' } }
    const { productId } = action.payload

    it('should handle', () => {
      return expectSaga(handleDeleteProductRating, action)
        .provide([[matchers.call.fn(API.patch), [1, 2, 3]]])
        .put(startRatingLoading(productId))
        .put(deleteProductRatingSuccess([1, 2, 3]))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')

      return expectSaga(handleDeleteProductRating, action)
        .provide([[matchers.call.fn(API.patch), throwError(error)]])
        .put(startRatingLoading(productId))
        .put(deleteProductRatingError(productId))
        .run()
    })
  })

  describe('addProduct', () => {
    const action = {
      payload: {
        productFormData: { foo: 'bar' },
        history: {
          push: jest.fn(),
        },
        setFormSubmitting: jest.fn(),
      },
    }

    beforeEach(() => {
      action.payload.history.push.mockClear()
      action.payload.setFormSubmitting.mockClear()
    })

    it('should handle', () => {
      expectSaga(handleAddProduct, action)
        .provide([[matchers.call.fn(API.post), [1, 2, 3]]])
        .put(addProductSuccess([1, 2, 3]))
        .run()

      expect(action.payload.history.push).toHaveBeenCalledTimes(1)
      expect(action.payload.history.push).toHaveBeenCalledWith(PAGE_PATHS.ADMIN_PRODUCTS)
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Product add error!'

      expectSaga(handleAddProduct, action)
        .provide([[matchers.call.fn(API.post), throwError(error)]])
        .put(addProductError(errorMessage))
        .run()

      expect(action.payload.setFormSubmitting).toHaveBeenCalledTimes(1)
      expect(action.payload.setFormSubmitting).toHaveBeenCalledWith(false)
    })
  })

  describe('editProduct', () => {
    const action = {
      payload: {
        id: '1',
        changedFieldsFormData: { foo: 'bar' },
        history: {
          push: jest.fn(),
        },
        setFormSubmitting: jest.fn(),
      },
    }

    beforeEach(() => {
      action.payload.history.push.mockClear()
      action.payload.setFormSubmitting.mockClear()
    })

    it('should handle', () => {
      expectSaga(handleEditProduct, action)
        .provide([[matchers.call.fn(API.patch), [1, 2, 3]]])
        .put(editProductSuccess([1, 2, 3]))
        .run()

      expect(action.payload.history.push).toHaveBeenCalledTimes(1)
      expect(action.payload.history.push).toHaveBeenCalledWith(PAGE_PATHS.ADMIN_PRODUCTS)
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Product edit error!'

      expectSaga(handleEditProduct, action)
        .provide([[matchers.call.fn(API.patch), throwError(error)]])
        .put(editProductError(errorMessage))
        .run()

      expect(action.payload.setFormSubmitting).toHaveBeenCalledTimes(1)
      expect(action.payload.setFormSubmitting).toHaveBeenCalledWith(false)
    })
  })

  describe('deleteProducts', () => {
    const selectedProducts = ['1', '2']

    it('should handle', () => {
      return expectSaga(handleDeleteProducts)
        .provide([
          [matchers.call.fn(API.delete), [1, 2, 3]],
          [select(getSelectedProducts), selectedProducts],
        ])
        .put(closeModal())
        .put(startProductsLoading())
        .put(deleteProductsSuccess(selectedProducts))
        .put(setSelectedProducts(List()))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Products delete error!'

      return expectSaga(handleDeleteProducts)
        .provide([[matchers.call.fn(API.delete), throwError(error)]])
        .put(deleteProductsError(errorMessage))
        .put(setSelectedProducts(List()))
        .run()
    })
  })
})
