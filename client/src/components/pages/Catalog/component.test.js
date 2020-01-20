import React from 'react'
import { shallow } from 'enzyme'
import { List, Record } from 'immutable'

import CatalogPage from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('CatalogPage component', () => {
  let props
  let wrapper
  const mockFetchProducts = jest.fn()
  const testProduct1 = Record({ _id: '1', title: 'First', imageName: 'imageName1', price: 77 })()
  const testProduct2 = Record({ _id: '2', title: 'Second', imageName: 'imageName2', price: 88 })()
  const testProduct3 = Record({ _id: '3', title: 'Third', imageName: 'imageName3', price: 99 })()
  const testProductsList = List([testProduct1, testProduct2, testProduct3])

  const generateWrapper = passedProps => {
    const initialProps = {
      products: List(),
      error: null,
      isLoading: false,
      fetchProducts: mockFetchProducts,
    }
    props = { ...initialProps, ...passedProps }

    return shallow(<CatalogPage {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render error message if products list is empty', () => {
    const errorMessage = findByTestAttr(wrapper, 'errorMessage')

    expect(errorMessage).toHaveLength(1)
  })

  it('should render correct text in error message', () => {
    const errorMessage = findByTestAttr(wrapper, 'errorMessage')

    expect(errorMessage.text()).toBe('Sorry, there are no products yet')
  })

  it('should render error message after error', () => {
    wrapper = generateWrapper({
      products: testProductsList,
      error: 'test error message',
    })
    const errorMessage = findByTestAttr(wrapper, 'errorMessage')

    expect(errorMessage).toHaveLength(1)
  })

  it('should render loader', () => {
    wrapper = generateWrapper({
      products: testProductsList,
      isLoading: true,
    })
    const loader = findByTestAttr(wrapper, 'loader')

    expect(loader).toHaveLength(1)
  })

  it('should render correct amount of ProductCards', () => {
    wrapper = generateWrapper({
      products: testProductsList,
    })
    const productCard = findByTestAttr(wrapper, 'productCard')

    expect(productCard).toHaveLength(testProductsList.size)
  })
})
