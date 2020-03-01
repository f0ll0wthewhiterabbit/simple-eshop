import React from 'react'
import { shallow } from 'enzyme'

import FilterSelect from './component'
import findByTestAttr from '../../../../utils/findByTestAttr'
import { FIELDS } from '../../../../constants'

describe('FilterSelect component', () => {
  let wrapper
  const initialProps = {
    filter: FIELDS.URL_NO_FILTER,
    isDarkTheme: false,
    fetchProductsRequest: jest.fn(),
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
    initialProps.fetchProductsRequest.mockClear()
    initialProps.setProductsFilter.mockClear()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render filter from props', () => {
    const select = findByTestAttr(wrapper, dataTestSelect)

    expect(select.props().value).toBe(FIELDS.URL_NO_FILTER)
  })

  it('should handle filter change', () => {
    const select = findByTestAttr(wrapper, dataTestSelect)
    select.simulate('change', { target: { value: FIELDS.URL_RATINGS_FILTER } })

    expect(initialProps.setProductsFilter).toHaveBeenCalledTimes(1)
    expect(initialProps.setProductsFilter).toHaveBeenCalledWith(FIELDS.URL_RATINGS_FILTER)
    expect(initialProps.fetchProductsRequest).toHaveBeenCalledTimes(1)
    expect(initialProps.fetchProductsRequest).toHaveBeenCalledWith(
      1,
      null,
      undefined,
      FIELDS.URL_RATINGS_FILTER
    )
  })

  it('should change select menu background color in dark mode', () => {
    wrapper = generateWrapper({ isDarkTheme: true })

    expect(wrapper).toMatchSnapshot()
  })
})
