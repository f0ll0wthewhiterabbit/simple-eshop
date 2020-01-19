import React from 'react'
import { shallow } from 'enzyme'

import AlertDialog from './component'
import findByTestAttr from '../../../utils/findByTestAttr'
import {
  STORE_FIELD_PRODUCTS,
  STORE_FIELD_USERS,
  STORE_FIELD_CURRENT_USER,
} from '../../../constants'

describe('AlertDialog component', () => {
  let props
  let wrapper
  const testTitle = 'Test Title'
  const mockCloseModal = jest.fn()
  const mockDeleteUsers = jest.fn()
  const mockDeleteProducts = jest.fn()
  const mockRequestUserDeletion = jest.fn()

  const generateWrapper = passedProps => {
    const initialProps = {
      isModalOpened: false,
      title: testTitle,
      children: '',
      closeModal: mockCloseModal,
      storeFieldName: '',
      deleteUsers: mockDeleteUsers,
      deleteProducts: mockDeleteProducts,
      requestUserDeletion: mockRequestUserDeletion,
    }
    props = { ...initialProps, ...passedProps }

    return shallow(<AlertDialog {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should be closed', () => {
    const dialogContainer = findByTestAttr(wrapper, 'dialogContainer')

    expect(dialogContainer.props().open).toBe(false)
  })

  it(`should be opened if prop 'isModalOpened=true'`, () => {
    wrapper = generateWrapper({ isModalOpened: true })
    const dialogContainer = findByTestAttr(wrapper, 'dialogContainer')

    expect(dialogContainer.props().open).toBe(true)
  })

  it('should contain correct title', () => {
    const dialogTitle = findByTestAttr(wrapper, 'dialogTitle')

    expect(dialogTitle.text()).toBe(testTitle)
  })

  it(`shouldn't contain additional text`, () => {
    const dialogContentText = findByTestAttr(wrapper, 'dialogContentText')

    expect(dialogContentText).toHaveLength(0)
  })

  it('should contain additional text passed as children', () => {
    const testAdditionalText = 'test additional text'
    wrapper = generateWrapper({ children: testAdditionalText })
    const dialogContentText = findByTestAttr(wrapper, 'dialogContentText')

    expect(dialogContentText).toHaveLength(1)
    expect(dialogContentText.text()).toBe(testAdditionalText)
  })

  it('should be closed after close button click', () => {
    const cancelButton = findByTestAttr(wrapper, 'cancelButton')
    cancelButton.simulate('click')

    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })

  it('should be confirmed but not handled after confirm button click', () => {
    const confirmButton = findByTestAttr(wrapper, 'confirmButton')
    confirmButton.simulate('click')

    expect(mockDeleteUsers).toHaveBeenCalledTimes(0)
    expect(mockDeleteProducts).toHaveBeenCalledTimes(0)
    expect(mockRequestUserDeletion).toHaveBeenCalledTimes(0)
  })

  it('should handle delete users after confirm button click', () => {
    wrapper = generateWrapper({ storeFieldName: STORE_FIELD_USERS })
    const confirmButton = findByTestAttr(wrapper, 'confirmButton')
    confirmButton.simulate('click')

    expect(mockDeleteUsers).toHaveBeenCalledTimes(1)
  })

  it('should handle delete products after confirm button click', () => {
    wrapper = generateWrapper({ storeFieldName: STORE_FIELD_PRODUCTS })
    const confirmButton = findByTestAttr(wrapper, 'confirmButton')
    confirmButton.simulate('click')

    expect(mockDeleteProducts).toHaveBeenCalledTimes(1)
  })

  it('should handle deletetion request of user after confirm button click', () => {
    wrapper = generateWrapper({ storeFieldName: STORE_FIELD_CURRENT_USER })
    const confirmButton = findByTestAttr(wrapper, 'confirmButton')
    confirmButton.simulate('click')

    expect(mockRequestUserDeletion).toHaveBeenCalledTimes(1)
  })
})
