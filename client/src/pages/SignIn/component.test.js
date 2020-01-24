import React from 'react'
import { shallow } from 'enzyme'

import SingInPage from './component'
import findByTestAttr from '../../utils/findByTestAttr'
import {
  ROLE_GUEST,
  ROLE_USER,
  MAIN_PAGE_PATH,
  ROLE_ADMIN,
  ADMIN_PRODUCTS_PAGE_PATH,
} from '../../constants'

describe('SingInPage component', () => {
  let wrapper
  const initialProps = {
    isAuthenticated: false,
    userRole: ROLE_GUEST,
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
      userRole: ROLE_USER,
    })
    const redirect = findByTestAttr(wrapper, dataTestRedirect)

    expect(redirect).toHaveLength(1)
  })

  it('should redirect user to main page', () => {
    wrapper = generateWrapper({
      isAuthenticated: true,
      userRole: ROLE_USER,
    })
    const redirect = findByTestAttr(wrapper, dataTestRedirect)

    expect(redirect.props().to).toBe(MAIN_PAGE_PATH)
  })

  it(`should redirect administrator to administrator's products page`, () => {
    wrapper = generateWrapper({
      isAuthenticated: true,
      userRole: ROLE_ADMIN,
    })
    const redirect = findByTestAttr(wrapper, dataTestRedirect)

    expect(redirect.props().to).toBe(ADMIN_PRODUCTS_PAGE_PATH)
  })
})
