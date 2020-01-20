import React from 'react'
import { shallow } from 'enzyme'
import { Record, List } from 'immutable'

import ProductCard from './component'
import findByTestAttr from '../../../../../utils/findByTestAttr'
import formatPrice from '../../../../../utils/formatPrice'

describe('ProductCard component', () => {
  let props
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
  const mockChangeProductRating = jest.fn()
  const mockDeleteProductRating = jest.fn()

  const generateWrapper = passedProps => {
    const initialProps = {
      productData,
      changeProductRating: mockChangeProductRating,
      deleteProductRating: mockDeleteProductRating,
      ratingsLoadingList: List(),
      ratingsErrorList: List(),
    }
    props = { ...initialProps, ...passedProps }

    return shallow(<ProductCard {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    mockChangeProductRating.mockReset()
    mockDeleteProductRating.mockReset()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should contain correct title', () => {
    const title = findByTestAttr(wrapper, 'title')

    expect(title.text()).toBe(productData.title)
  })

  it('should contain correct description', () => {
    const description = findByTestAttr(wrapper, 'description')

    expect(description.text()).toBe(productData.description)
  })

  it('should contain correct price', () => {
    const price = findByTestAttr(wrapper, 'price')
    const expectedPrice = formatPrice(productData.price)

    expect(price.text()).toBe(expectedPrice)
  })

  it('should contain correct tags', () => {
    const tags = findByTestAttr(wrapper, 'tag')

    expect(tags).toHaveLength(productData.tags.size)
  })

  it('should contain correct average rating', () => {
    const averageRating = findByTestAttr(wrapper, 'averageRating')

    expect(averageRating.props().value).toBe(productData.ratingInfo.average)
  })

  it('should contain correct votes amount', () => {
    const ratingsCount = findByTestAttr(wrapper, 'ratingsCount')
    const expectedAmount = `(${productData.ratingInfo.votesAmount})`

    expect(ratingsCount.text()).toBe(expectedAmount)
  })

  it('should contain correct user rating', () => {
    const userRating = findByTestAttr(wrapper, 'userRating')

    expect(userRating.props().value).toBe(productData.ratingInfo.currentUserRating)
  })

  it('should contain delete user rating button', () => {
    const deleteButton = findByTestAttr(wrapper, 'deleteButton')

    expect(deleteButton).toHaveLength(1)
  })

  it('should handle delete user rating', () => {
    const deleteButton = findByTestAttr(wrapper, 'deleteButton')
    deleteButton.simulate('click')

    expect(mockDeleteProductRating).toHaveBeenCalledTimes(1)
    expect(mockDeleteProductRating).toHaveBeenCalledWith(productData._id)
  })

  it('should handle change user rating', () => {
    const newUserRating = 1
    const userRating = findByTestAttr(wrapper, 'userRating')
    userRating.simulate('change', {}, newUserRating)

    expect(mockChangeProductRating).toHaveBeenCalledTimes(1)
    expect(mockChangeProductRating).toHaveBeenCalledWith({
      productId: productData._id,
      userRating: newUserRating,
    })
  })

  it('should contain correct raiting error message', () => {
    wrapper = generateWrapper({ ratingsErrorList: List([productData._id]) })
    const ratingError = findByTestAttr(wrapper, 'ratingError')

    expect(ratingError).toHaveLength(1)
    expect(ratingError.text()).toBe('Something went wrong!')
  })

  it('should contain correct raiting loading message', () => {
    wrapper = generateWrapper({ ratingsLoadingList: List([productData._id]) })
    const ratingLoading = findByTestAttr(wrapper, 'ratingLoading')

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
      const userRating = findByTestAttr(wrapper, 'userRating')

      expect(userRating.props().value).toBe(0)
    })

    it(`shouldn't contain delete user rating button`, () => {
      const deleteButton = findByTestAttr(wrapper, 'deleteButton')

      expect(deleteButton).toHaveLength(0)
    })
  })
})
