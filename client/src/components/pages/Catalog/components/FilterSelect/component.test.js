import React from 'react'
import { shallow } from 'enzyme'

import FilterSelect from './component'
import findByTestAttr from '../../../../../utils/findByTestAttr'
import { URL_FIELD_NO_FILTER, URL_FIELD_RATINGS_FILTER } from '../../../../../constants'

describe('FilterSelect component', () => {
  let wrapper
  const initialProps = {
    filter: URL_FIELD_NO_FILTER,
    fetchProducts: jest.fn(),
    setProductsFilter: jest.fn(),
  }
  const dataTestSelect = 'select'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<FilterSelect {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    initialProps.fetchProducts.mockClear()
    initialProps.setProductsFilter.mockClear()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render filter from props', () => {
    const select = findByTestAttr(wrapper, dataTestSelect)

    expect(select.props().value).toBe(URL_FIELD_NO_FILTER)
  })

  it('should handle filter change', () => {
    const select = findByTestAttr(wrapper, dataTestSelect)
    select.simulate('change', { target: { value: URL_FIELD_RATINGS_FILTER } })

    expect(initialProps.setProductsFilter).toHaveBeenCalledTimes(1)
    expect(initialProps.setProductsFilter).toHaveBeenCalledWith(URL_FIELD_RATINGS_FILTER)
    expect(initialProps.fetchProducts).toHaveBeenCalledTimes(1)
    expect(initialProps.fetchProducts).toHaveBeenCalledWith(1, null, URL_FIELD_RATINGS_FILTER)
  })
})
