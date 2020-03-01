import React from 'react'
import { shallow } from 'enzyme'
import { Record, List } from 'immutable'

import ProductCard from './component'
import findByTestAttr from '../../../../utils/findByTestAttr'

jest.mock('../../../../utils/formatPrice')

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
  const initialProps = { productData }
  const dataTestTitle = 'title'
  const dataTestDescription = 'description'
  const dataTestTag = 'tag'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<ProductCard {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
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

  it('should contain correct tags', () => {
    const tags = findByTestAttr(wrapper, dataTestTag)

    expect(tags).toHaveLength(productData.tags.size)
  })
})
