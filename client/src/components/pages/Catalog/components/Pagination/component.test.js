import React from 'react'
import { shallow } from 'enzyme'

import Pagination from './component'
import findByTestAttr from '../../../../../utils/findByTestAttr'
import { URL_FIELD_RATINGS_FILTER } from '../../../../../constants'

describe('Pagination component', () => {
  let props
  let wrapper
  const filter = URL_FIELD_RATINGS_FILTER
  const currentPage = 5
  const totalPages = 10
  const mockFetchProducts = jest.fn()

  const generateWrapper = passedProps => {
    const initialProps = {
      currentPage,
      totalPages,
      filter,
      fetchProducts: mockFetchProducts,
    }
    props = { ...initialProps, ...passedProps }

    return shallow(<Pagination {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    mockFetchProducts.mockClear()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render correct number for current page', () => {
    const paginationButton = findByTestAttr(wrapper, `paginationButton${currentPage}`)

    expect(paginationButton.text()).toBe(currentPage.toString())
  })

  it('should render current page button as active button', () => {
    const paginationButton = findByTestAttr(wrapper, `paginationButton${currentPage}`)

    expect(paginationButton.props().active).toBeTruthy()
  })

  it('should contain correct page numbers', () => {
    const paginationItems = findByTestAttr(wrapper, 'paginationItem')
    const expectedAmountOfButtons = 7

    expect(paginationItems).toHaveLength(expectedAmountOfButtons)
  })

  it('should contain correct page numbers for first page', () => {
    wrapper = generateWrapper({ currentPage: 1 })
    const paginationItems = findByTestAttr(wrapper, 'paginationItem')
    const expectedAmountOfButtons = 4

    expect(paginationItems).toHaveLength(expectedAmountOfButtons)
  })

  it('should contain correct page numbers for last page', () => {
    wrapper = generateWrapper({ currentPage: totalPages })
    const paginationItems = findByTestAttr(wrapper, 'paginationItem')
    const expectedAmountOfButtons = 4

    expect(paginationItems).toHaveLength(expectedAmountOfButtons)
  })

  it('should contain disabled previous button for first page', () => {
    wrapper = generateWrapper({ currentPage: 1 })
    const previousButton = findByTestAttr(wrapper, 'previousButton')

    expect(previousButton.props().disabled).toBeTruthy()
  })

  it('should contain disabled previous button for last page', () => {
    wrapper = generateWrapper({ currentPage: totalPages })
    const nextButton = findByTestAttr(wrapper, 'nextButton')

    expect(nextButton.props().disabled).toBeTruthy()
  })

  it('should handle page number click', () => {
    const pageNumber = 7
    const paginationButton = findByTestAttr(wrapper, `paginationButton${pageNumber}`)
    paginationButton.simulate('click', { target: { innerText: pageNumber.toString() } })

    expect(mockFetchProducts).toHaveBeenLastCalledWith(pageNumber, null, filter)
  })

  it('should handle previous page click', () => {
    const previousButton = findByTestAttr(wrapper, 'previousButton')
    previousButton.simulate('click')

    expect(mockFetchProducts).toHaveBeenLastCalledWith(currentPage - 1, null, filter)
  })

  it('should handle next page click', () => {
    const nextButton = findByTestAttr(wrapper, 'nextButton')
    nextButton.simulate('click')

    expect(mockFetchProducts).toHaveBeenLastCalledWith(currentPage + 1, null, filter)
  })

  it('should handle active page button click', () => {
    const paginationButton = findByTestAttr(wrapper, `paginationButton${currentPage}`)
    paginationButton.simulate('click')

    expect(mockFetchProducts).toHaveBeenCalledTimes(0)
  })
})
