import React from 'react'
import { shallow } from 'enzyme'

import Layout from './component'
import { ROLE_GUEST, ROLE_ADMIN, ROLE_USER } from '../../../constants'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('Layout component', () => {
  let props
  let wrapper
  const testContent = 'test content'
  const testChildren = <p>{testContent}</p>

  const generateWrapper = passedProps => {
    const initialProps = {
      isAuthenticated: false,
      userRole: ROLE_GUEST,
      children: testChildren,
    }
    props = { ...initialProps, ...passedProps }

    return shallow(<Layout {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render standardLayout', () => {
    const standardLayout = findByTestAttr(wrapper, 'standardLayout')

    expect(standardLayout).toHaveLength(1)
  })

  it('should contain correct children', () => {
    const standardLayout = findByTestAttr(wrapper, 'standardLayout')

    expect(standardLayout.find('p').text()).toEqual(testContent)
  })

  it('should render adminLayout for administrator', () => {
    wrapper = generateWrapper({ isAuthenticated: true, userRole: ROLE_ADMIN })
    const adminLayout = findByTestAttr(wrapper, 'adminLayout')

    expect(adminLayout).toHaveLength(1)
  })

  it(`shouldn't render adminLayout for authenticated user`, () => {
    wrapper = generateWrapper({ isAuthenticated: true, userRole: ROLE_USER })
    const adminLayout = findByTestAttr(wrapper, 'adminLayout')

    expect(adminLayout).toHaveLength(0)
  })
})
