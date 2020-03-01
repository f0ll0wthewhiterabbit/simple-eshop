import React from 'react'
import { shallow } from 'enzyme'
import { Record, List } from 'immutable'

import Ratings from './component'
import findByTestAttr from '../../../../../../utils/findByTestAttr'

jest.mock('../../../../../../utils/formatPrice')

describe('Ratings component', () => {
  let wrapper
  const productData = Record({
    _id: '1',
    title: 'TestTitle',
    description: 'TestDescription',
    imageName: 'TestImageName',
    price: 99,
    tags: List(['firstTag', 'secondTag']),
    ratingInfo: Record({
      average: 5,
      votesAmount: 2,
      currentUserRating: 5,
    })(),
  })()
  const initialProps = {
    productData,
    changeProductRatingRequest: jest.fn(),
    deleteProductRatingRequest: jest.fn(),
    ratingsLoadingList: List(),
    ratingsErrorList: List(),
  }

  const dataTestAverageRating = 'averageRating'
  const dataTestRatingsCount = 'ratingsCount'
  const dataTestUserRating = 'userRating'
  const dataTestRatingError = 'ratingError'
  const dataTestRatingLoading = 'ratingLoading'
  const dataTestDeleteButton = 'deleteButton'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<Ratings {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    initialProps.changeProductRatingRequest.mockReset()
    initialProps.deleteProductRatingRequest.mockReset()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should contain correct average rating', () => {
    const averageRating = findByTestAttr(wrapper, dataTestAverageRating)

    expect(averageRating.props().value).toBe(productData.ratingInfo.average)
  })

  it('should contain correct votes amount', () => {
    const ratingsCount = findByTestAttr(wrapper, dataTestRatingsCount)
    const expectedAmount = `(${productData.ratingInfo.votesAmount})`

    expect(ratingsCount.text()).toBe(expectedAmount)
  })

  it('should contain correct user rating', () => {
    const userRating = findByTestAttr(wrapper, dataTestUserRating)

    expect(userRating.props().value).toBe(productData.ratingInfo.currentUserRating)
  })

  it('should contain delete user rating button', () => {
    const deleteButton = findByTestAttr(wrapper, dataTestDeleteButton)

    expect(deleteButton).toHaveLength(1)
  })

  it('should handle delete user rating', () => {
    const deleteButton = findByTestAttr(wrapper, dataTestDeleteButton)
    deleteButton.simulate('click')

    expect(initialProps.deleteProductRatingRequest).toHaveBeenCalledTimes(1)
    expect(initialProps.deleteProductRatingRequest).toHaveBeenCalledWith(productData._id)
  })

  it('should handle change user rating', () => {
    const newUserRating = 1
    const userRating = findByTestAttr(wrapper, dataTestUserRating)
    userRating.simulate('change', {}, newUserRating)

    expect(initialProps.changeProductRatingRequest).toHaveBeenCalledTimes(1)
    expect(initialProps.changeProductRatingRequest).toHaveBeenCalledWith({
      productId: productData._id,
      userRating: newUserRating,
    })
  })

  it('should contain correct rating error message', () => {
    wrapper = generateWrapper({ ratingsErrorList: List([productData._id]) })
    const ratingError = findByTestAttr(wrapper, dataTestRatingError)

    expect(ratingError).toHaveLength(1)
    expect(ratingError.text()).toBe('Something went wrong!')
  })

  it('should contain correct rating loading message', () => {
    wrapper = generateWrapper({ ratingsLoadingList: List([productData._id]) })
    const ratingLoading = findByTestAttr(wrapper, dataTestRatingLoading)

    expect(ratingLoading).toHaveLength(1)
    expect(ratingLoading.text()).toBe('Loading...')
  })

  describe('without user rating', () => {
    beforeEach(() => {
      const productDataWithoutUserRating = Record({
        _id: '1',
        title: 'TestTitle',
        description: 'TestDescription',
        imageName: 'TestImageName',
        price: 99,
        tags: List(['firstTag', 'secondTag']),
        ratingInfo: Record({
          average: 5,
          votesAmount: 1,
        })(),
      })()
      wrapper = generateWrapper({ productData: productDataWithoutUserRating })
    })

    it(`shouldn't contain user rating`, () => {
      const userRating = findByTestAttr(wrapper, dataTestUserRating)

      expect(userRating.props().value).toBe(0)
    })

    it(`shouldn't contain delete user rating button`, () => {
      const deleteButton = findByTestAttr(wrapper, dataTestDeleteButton)

      expect(deleteButton).toHaveLength(0)
    })
  })
})
