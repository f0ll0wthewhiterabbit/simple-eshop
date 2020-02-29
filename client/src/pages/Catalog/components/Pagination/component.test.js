import React from 'react'
import { shallow } from 'enzyme'

import Pagination from './component'
import findByTestAttr from '../../../../utils/findByTestAttr'
import { FIELDS } from '../../../../constants'

describe('Pagination component', () => {
  let wrapper
  const filter = FIELDS.URL_RATINGS_FILTER
  const initialProps = {
    currentPage: 5,
    totalPages: 10,
    totalAmount: 85,
    filter: FIELDS.URL_RATINGS_FILTER,
    fetchProducts: jest.fn(),
  }
  const dataTestPaginationItem = 'paginationItem'
  const dataTestPerviousButton = 'previousButton'
  const dataTestNextButton = 'nextButton'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<Pagination {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    initialProps.fetchProducts.mockClear()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render correct number for current page', () => {
    const paginationButton = findByTestAttr(wrapper, `paginationButton${initialProps.currentPage}`)

    expect(paginationButton.text()).toBe(initialProps.currentPage.toString())
  })

  it('should render current page button as active button', () => {
    const paginationButton = findByTestAttr(wrapper, `paginationButton${initialProps.currentPage}`)

    expect(paginationButton.props().active).toBeTruthy()
  })

  it('should contain correct page numbers', () => {
    const paginationItems = findByTestAttr(wrapper, dataTestPaginationItem)
    const expectedAmountOfButtons = 7

    expect(paginationItems).toHaveLength(expectedAmountOfButtons)
  })

  it('should contain correct page numbers for first page', () => {
    wrapper = generateWrapper({ currentPage: 1 })
    const paginationItems = findByTestAttr(wrapper, dataTestPaginationItem)
    const expectedAmountOfButtons = 4

    expect(paginationItems).toHaveLength(expectedAmountOfButtons)
  })

  it('should contain correct page numbers for last page', () => {
    wrapper = generateWrapper({ currentPage: initialProps.totalPages })
    const paginationItems = findByTestAttr(wrapper, dataTestPaginationItem)
    const expectedAmountOfButtons = 4

    expect(paginationItems).toHaveLength(expectedAmountOfButtons)
  })

  it('should contain disabled previous button for first page', () => {
    wrapper = generateWrapper({ currentPage: 1 })
    const previousButton = findByTestAttr(wrapper, dataTestPerviousButton)

    expect(previousButton.props().disabled).toBeTruthy()
  })

  it('should contain disabled previous button for last page', () => {
    wrapper = generateWrapper({ currentPage: initialProps.totalPages })
    const nextButton = findByTestAttr(wrapper, dataTestNextButton)

    expect(nextButton.props().disabled).toBeTruthy()
  })

  it('should handle page number click', () => {
    const pageNumber = 7
    const paginationButton = findByTestAttr(wrapper, `paginationButton${pageNumber}`)
    paginationButton.simulate('click', { target: { innerText: pageNumber.toString() } })

    expect(initialProps.fetchProducts).toHaveBeenLastCalledWith(pageNumber, null, undefined, filter)
  })

  it('should handle previous page click', () => {
    const previousButton = findByTestAttr(wrapper, dataTestPerviousButton)
    previousButton.simulate('click')

    expect(initialProps.fetchProducts).toHaveBeenLastCalledWith(
      initialProps.currentPage - 1,
      null,
      undefined,
      filter
    )
  })

  it('should handle next page click', () => {
    const nextButton = findByTestAttr(wrapper, dataTestNextButton)
    nextButton.simulate('click')

    expect(initialProps.fetchProducts).toHaveBeenLastCalledWith(
      initialProps.currentPage + 1,
      null,
      undefined,
      filter
    )
  })

  it('should handle active page button click', () => {
    const paginationButton = findByTestAttr(wrapper, `paginationButton${initialProps.currentPage}`)
    paginationButton.simulate('click')

    expect(initialProps.fetchProducts).toHaveBeenCalledTimes(0)
  })
})
