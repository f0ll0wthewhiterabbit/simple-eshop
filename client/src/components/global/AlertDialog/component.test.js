import React from 'react'
import { shallow } from 'enzyme'

import AlertDialog from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('AlertDialog component', () => {
  let wrapper
  const initialProps = {
    isModalOpened: false,
    title: 'Test Title',
    children: '',
    closeModal: jest.fn(),
    storeFieldName: '',
    confirmMethod: jest.fn(),
  }
  const dataTestDialogContainer = 'dialogContainer'
  const dataTestDialogTitle = 'dialogTitle'
  const dataTestDialogContentText = 'dialogContentText'
  const dataTestCancelButton = 'cancelButton'
  const dataTestConfirmButton = 'confirmButton'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<AlertDialog {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    initialProps.closeModal.mockClear()
    initialProps.confirmMethod.mockClear()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should be closed', () => {
    const dialogContainer = findByTestAttr(wrapper, dataTestDialogContainer)

    expect(dialogContainer.props().open).toBe(false)
  })

  it(`should be opened if prop 'isModalOpened=true'`, () => {
    wrapper = generateWrapper({ isModalOpened: true })
    const dialogContainer = findByTestAttr(wrapper, dataTestDialogContainer)

    expect(dialogContainer.props().open).toBe(true)
  })

  it('should contain correct title', () => {
    const dialogTitle = findByTestAttr(wrapper, dataTestDialogTitle)

    expect(dialogTitle.text()).toBe(initialProps.title)
  })

  it(`shouldn't contain additional text`, () => {
    const dialogContentText = findByTestAttr(wrapper, dataTestDialogContentText)

    expect(dialogContentText).toHaveLength(0)
  })

  it('should contain additional text passed as children', () => {
    const testAdditionalText = 'test additional text'
    wrapper = generateWrapper({ children: testAdditionalText })
    const dialogContentText = findByTestAttr(wrapper, dataTestDialogContentText)

    expect(dialogContentText).toHaveLength(1)
    expect(dialogContentText.text()).toBe(testAdditionalText)
  })

  it('should be closed after close button click', () => {
    const cancelButton = findByTestAttr(wrapper, dataTestCancelButton)
    cancelButton.simulate('click')

    expect(initialProps.closeModal).toHaveBeenCalledTimes(1)
  })

  it('should handle confirm method after confirm button click', () => {
    const confirmButton = findByTestAttr(wrapper, dataTestConfirmButton)
    confirmButton.simulate('click')

    expect(initialProps.confirmMethod).toHaveBeenCalledTimes(1)
  })
})
