import React from 'react'
import { shallow } from 'enzyme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { UserMenu } from './component'
import findByTestAttr from '../../../../../utils/findByTestAttr'

jest.mock('@material-ui/core/useMediaQuery')

describe('UserMenu component', () => {
  let props
  let wrapper
  const showModal = jest.fn()
  const signOut = jest.fn()
  const testUserName = 'testUserName'
  const dataTestMenu = 'menu'
  const dataTestDeleteAccountButton = 'deleteAccountButton'
  const dataTestMenuButton = 'menuButton'
  const dataTestProfileButton = 'profileButton'
  const dataTestSignOutButton = 'signOutButton'

  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(init => [init, setState])

  const generateWrapper = passedProps => {
    const defaultProps = {
      theme: { breakpoints: { up: jest.fn() } },
      userName: testUserName,
      isAdmin: false,
      isDeleteRequestSent: false,
      showModal,
      signOut,
      history: { push: jest.fn() },
      location: { pathname: '/testPathName' },
    }
    props = { ...defaultProps, ...passedProps }

    return shallow(<UserMenu {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render', () => {
    expect(wrapper).toHaveLength(1)
  })

  it('should contain delete account button', () => {
    const button = findByTestAttr(wrapper, dataTestDeleteAccountButton)

    expect(button).toHaveLength(1)
  })

  it(`shouldn't contain delete account button if delete account request is sent`, () => {
    wrapper = generateWrapper({ isDeleteRequestSent: true })
    const button = findByTestAttr(wrapper, dataTestDeleteAccountButton)

    expect(button).toHaveLength(0)
  })

  it(`shouldn't contain delete account button in admin mode`, () => {
    wrapper = generateWrapper({ isAdmin: true })
    const button = findByTestAttr(wrapper, dataTestDeleteAccountButton)

    expect(button).toHaveLength(0)
  })

  it('should render button with user name on medium and large destop width', () => {
    useMediaQuery.mockImplementation(() => true)
    wrapper = generateWrapper()
    const button = findByTestAttr(wrapper, dataTestMenuButton)

    expect(button.text().indexOf(testUserName)).not.toBe(-1)
  })

  it('should render button without user name on small destop width', () => {
    useMediaQuery.mockImplementation(() => false)
    wrapper = generateWrapper()
    const button = findByTestAttr(wrapper, dataTestMenuButton)

    expect(button.text().indexOf(testUserName)).toBe(-1)
  })

  describe('closed menu', () => {
    it(`should initially render with closed menu`, () => {
      const menu = findByTestAttr(wrapper, dataTestMenu)

      expect(menu.props().open).toBe(false)
    })

    it('should open menu after button click', () => {
      const button = findByTestAttr(wrapper, dataTestMenuButton)
      const target = 'testTarget'
      button.simulate('click', { currentTarget: target })

      expect(setState).toHaveBeenCalledWith(target)
    })
  })

  describe('opened menu', () => {
    it(`should show modal after delete account button click`, () => {
      const deleteAccountButton = findByTestAttr(wrapper, dataTestDeleteAccountButton)
      deleteAccountButton.simulate('click')

      expect(showModal).toHaveBeenCalledTimes(1)
    })

    it(`should close menu after delete account button click`, () => {
      const menu = findByTestAttr(wrapper, dataTestMenu)
      const deleteAccountButton = findByTestAttr(wrapper, dataTestDeleteAccountButton)
      deleteAccountButton.simulate('click')

      expect(menu.props().open).toBe(false)
    })

    it(`should close menu after profile button click`, () => {
      const menu = findByTestAttr(wrapper, dataTestMenu)
      const profileButton = findByTestAttr(wrapper, dataTestProfileButton)
      profileButton.simulate('click')

      expect(menu.props().open).toBe(false)
    })

    it(`should sign out after sign out button click`, () => {
      const signOutButton = findByTestAttr(wrapper, dataTestSignOutButton)
      signOutButton.simulate('click')

      expect(signOut).toHaveBeenCalledTimes(1)
    })
  })
})
