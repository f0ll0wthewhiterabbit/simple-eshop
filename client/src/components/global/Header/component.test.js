import React from 'react'
import { shallow } from 'enzyme'

import Header from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('Header component', () => {
  let wrapper
  const initialProps = {
    openSidebar: jest.fn(),
    isAdmin: false,
    isAuthenticated: true,
    isDeleteRequestSent: false,
  }
  const dataTestMenuButton = 'menuButton'
  const dataTestWarningMessage = 'warningMessage'
  const dataTestUserMenu = 'userMenu'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<Header {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    initialProps.openSidebar.mockClear()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should contain user menu button', () => {
    const button = findByTestAttr(wrapper, dataTestUserMenu)

    expect(button).toHaveLength(1)
  })

  it(`shouldn't contain user menu button if not authenticated`, () => {
    wrapper = generateWrapper({ isAuthenticated: false })
    const button = findByTestAttr(wrapper, dataTestUserMenu)

    expect(button).toHaveLength(0)
  })

  it(`shouldn't contain warning message for users who sent account delete request`, () => {
    wrapper = generateWrapper({ isDeleteRequestSent: true })
    const warningMessage = findByTestAttr(wrapper, dataTestWarningMessage)

    expect(warningMessage).toHaveLength(1)
  })

  it('should contain menu button in admin mode', () => {
    wrapper = generateWrapper({ isAdmin: true })
    const button = findByTestAttr(wrapper, dataTestMenuButton)

    expect(button).toHaveLength(1)
  })

  it(`shouldn't contain menu button if not admin`, () => {
    const button = findByTestAttr(wrapper, dataTestMenuButton)

    expect(button).toHaveLength(0)
  })

  it('should open sidebar after menu button click', () => {
    wrapper = generateWrapper({ isAdmin: true })
    const button = findByTestAttr(wrapper, dataTestMenuButton)
    button.simulate('click')

    expect(initialProps.openSidebar).toHaveBeenCalledTimes(1)
  })
})
