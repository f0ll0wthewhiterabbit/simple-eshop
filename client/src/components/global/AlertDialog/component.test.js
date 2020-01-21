import React from 'react'
import { shallow } from 'enzyme'

import AlertDialog from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('AlertDialog component', () => {
  let props
  let wrapper
  const testTitle = 'Test Title'
  const mockCloseModal = jest.fn()
  const mockConfirmMethod = jest.fn()

  const generateWrapper = passedProps => {
    const initialProps = {
      isModalOpened: false,
      title: testTitle,
      children: '',
      closeModal: mockCloseModal,
      storeFieldName: '',
      confirmMethod: mockConfirmMethod,
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

  it('should handle confirm method after confirm button click', () => {
    const confirmButton = findByTestAttr(wrapper, 'confirmButton')
    confirmButton.simulate('click')

    expect(mockConfirmMethod).toHaveBeenCalledTimes(1)
  })
})
