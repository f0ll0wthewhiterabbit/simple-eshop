import React from 'react'
import { shallow } from 'enzyme'

import Layout from './component'
import { ROLES } from '../../../constants'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('Layout component', () => {
  let wrapper
  const testContent = 'test content'
  const initialProps = {
    isAuthenticated: false,
    userRole: ROLES.GUEST,
    children: <p>{testContent}</p>,
  }
  const dataTestStandardLayout = 'standardLayout'
  const dataTestAdminLayout = 'adminLayout'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<Layout {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render standardLayout', () => {
    const standardLayout = findByTestAttr(wrapper, dataTestStandardLayout)

    expect(standardLayout).toHaveLength(1)
  })

  it('should contain correct children', () => {
    const standardLayout = findByTestAttr(wrapper, dataTestStandardLayout)

    expect(standardLayout.find('p').text()).toEqual(testContent)
  })

  it('should render adminLayout for administrator', () => {
    wrapper = generateWrapper({ isAuthenticated: true, userRole: ROLES.ADMIN })
    const adminLayout = findByTestAttr(wrapper, dataTestAdminLayout)

    expect(adminLayout).toHaveLength(1)
  })

  it(`shouldn't render adminLayout for authenticated user`, () => {
    wrapper = generateWrapper({ isAuthenticated: true, userRole: ROLES.USER })
    const adminLayout = findByTestAttr(wrapper, dataTestAdminLayout)

    expect(adminLayout).toHaveLength(0)
  })
})
