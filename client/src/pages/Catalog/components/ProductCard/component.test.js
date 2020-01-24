import React from 'react'
import { shallow } from 'enzyme'
import { Record, List } from 'immutable'

import ProductCard from './component'
import findByTestAttr from '../../../../utils/findByTestAttr'
import formatPrice from '../../../../utils/formatPrice'

describe('ProductCard component', () => {
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
    changeProductRating: jest.fn(),
    deleteProductRating: jest.fn(),
    ratingsLoadingList: List(),
    ratingsErrorList: List(),
  }
  const dataTestTitle = 'title'
  const dataTestDescription = 'description'
  const dataTestTag = 'tag'
  const dataTestPrice = 'price'
  const dataTestAverageRating = 'averageRating'
  const dataTestRatingsCount = 'ratingsCount'
  const dataTestUserRating = 'userRating'
  const dataTestRatingError = 'ratingError'
  const dataTestRatingLoading = 'ratingLoading'
  const dataTestDeleteButton = 'deleteButton'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<ProductCard {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    initialProps.changeProductRating.mockReset()
    initialProps.deleteProductRating.mockReset()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should contain correct title', () => {
    const title = findByTestAttr(wrapper, dataTestTitle)

    expect(title.text()).toBe(productData.title)
  })

  it('should contain correct description', () => {
    const description = findByTestAttr(wrapper, dataTestDescription)

    expect(description.text()).toBe(productData.description)
  })

  it('should contain correct price', () => {
    const price = findByTestAttr(wrapper, dataTestPrice)
    const expectedPrice = formatPrice(productData.price)

    expect(price.text()).toBe(expectedPrice)
  })

  it('should contain correct tags', () => {
    const tags = findByTestAttr(wrapper, dataTestTag)

    expect(tags).toHaveLength(productData.tags.size)
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

    expect(initialProps.deleteProductRating).toHaveBeenCalledTimes(1)
    expect(initialProps.deleteProductRating).toHaveBeenCalledWith(productData._id)
  })

  it('should handle change user rating', () => {
    const newUserRating = 1
    const userRating = findByTestAttr(wrapper, dataTestUserRating)
    userRating.simulate('change', {}, newUserRating)

    expect(initialProps.changeProductRating).toHaveBeenCalledTimes(1)
    expect(initialProps.changeProductRating).toHaveBeenCalledWith({
      productId: productData._id,
      userRating: newUserRating,
    })
  })

  it('should contain correct raiting error message', () => {
    wrapper = generateWrapper({ ratingsErrorList: List([productData._id]) })
    const ratingError = findByTestAttr(wrapper, dataTestRatingError)

    expect(ratingError).toHaveLength(1)
    expect(ratingError.text()).toBe('Something went wrong!')
  })

  it('should contain correct raiting loading message', () => {
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
