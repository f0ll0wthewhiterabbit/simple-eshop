import React from 'react'
import { shallow } from 'enzyme'

import Header from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('Header component', () => {
  let props
  let wrapper
  const openSidebar = jest.fn()
  const dataTestMenuButton = 'menuButton'
  const dataTestWarningMessage = 'warningMessage'
  const dataTestUserMenu = 'userMenu'

  const generateWrapper = passedProps => {
    const defaultProps = {
      openSidebar,
      isAdmin: false,
      isAuthenticated: true,
      isDeleteRequestSent: false,
    }
    props = { ...defaultProps, ...passedProps }

    return shallow(<Header {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render', () => {
    expect(wrapper).toHaveLength(1)
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

    expect(openSidebar).toHaveBeenCalledTimes(1)
  })
})
