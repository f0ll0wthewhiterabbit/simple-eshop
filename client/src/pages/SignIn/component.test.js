import React from 'react'
import { shallow } from 'enzyme'

import SingInPage from './component'
import findByTestAttr from '../../utils/findByTestAttr'
import { ROLES, PAGE_PATHS } from '../../constants'

describe('SingInPage component', () => {
  let wrapper
  const initialProps = {
    isAuthenticated: false,
    userRole: ROLES.GUEST,
  }
  const dataTestRedirect = 'redirect'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<SingInPage {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`shouldn't redirect unauthenticated users`, () => {
    const redirect = findByTestAttr(wrapper, dataTestRedirect)

    expect(redirect).toHaveLength(0)
  })

  it('should redirect authenticated users', () => {
    wrapper = generateWrapper({
      isAuthenticated: true,
      userRole: ROLES.USER,
    })
    const redirect = findByTestAttr(wrapper, dataTestRedirect)

    expect(redirect).toHaveLength(1)
  })

  it('should redirect user to main page', () => {
    wrapper = generateWrapper({
      isAuthenticated: true,
      userRole: ROLES.USER,
    })
    const redirect = findByTestAttr(wrapper, dataTestRedirect)

    expect(redirect.props().to).toBe(PAGE_PATHS.HOME)
  })

  it(`should redirect administrator to administrator's products page`, () => {
    wrapper = generateWrapper({
      isAuthenticated: true,
      userRole: ROLES.ADMIN,
    })
    const redirect = findByTestAttr(wrapper, dataTestRedirect)

    expect(redirect.props().to).toBe(PAGE_PATHS.ADMIN_PRODUCTS)
  })
})
