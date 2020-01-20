import React from 'react'
import { shallow } from 'enzyme'

import FilterSelect from './component'
import findByTestAttr from '../../../../../utils/findByTestAttr'
import { URL_FIELD_NO_FILTER, URL_FIELD_RATINGS_FILTER } from '../../../../../constants'

describe('FilterSelect component', () => {
  let props
  let wrapper
  const mockFetchProducts = jest.fn()
  const mockSetProductsFilter = jest.fn()

  const generateWrapper = passedProps => {
    const initialProps = {
      filter: URL_FIELD_NO_FILTER,
      fetchProducts: mockFetchProducts,
      setProductsFilter: mockSetProductsFilter,
    }
    props = { ...initialProps, ...passedProps }

    return shallow(<FilterSelect {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render filter from props', () => {
    const select = findByTestAttr(wrapper, 'select')

    expect(select.props().value).toBe(URL_FIELD_NO_FILTER)
  })

  it('should handle filter change', () => {
    const select = findByTestAttr(wrapper, 'select')
    select.simulate('change', { target: { value: URL_FIELD_RATINGS_FILTER } })

    expect(mockSetProductsFilter).toHaveBeenCalledTimes(1)
    expect(mockSetProductsFilter).toHaveBeenCalledWith(URL_FIELD_RATINGS_FILTER)
    expect(mockFetchProducts).toHaveBeenCalledTimes(1)
    expect(mockFetchProducts).toHaveBeenCalledWith(1, null, URL_FIELD_RATINGS_FILTER)
  })
})
