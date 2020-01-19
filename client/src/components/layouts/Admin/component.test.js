import React from 'react'
import { shallow } from 'enzyme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { AdminLayout } from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

jest.mock('@material-ui/core/useMediaQuery')

describe('AdminLayout component', () => {
  let props
  let wrapper
  const testContent = 'test content'
  const testChildren = <p>{testContent}</p>

  const generateWrapper = passedProps => {
    const initialProps = {
      children: testChildren,
      isSidebarOpened: true,
      closeSidebar: jest.fn(),
      theme: { breakpoints: { up: jest.fn() } },
    }
    props = { ...initialProps, ...passedProps }

    return shallow(<AdminLayout {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should contain correct children in main', () => {
    const main = findByTestAttr(wrapper, 'main')

    expect(main.find('p').text()).toEqual(testContent)
  })

  it('should contain opened sidebar', () => {
    const sidebar = findByTestAttr(wrapper, 'sidebar')

    expect(sidebar.props().open).toEqual(true)
  })

  it(`should contain opened sidebar if'isSidebarOpened=true' and width not desktop`, () => {
    useMediaQuery.mockImplementation(() => false)
    wrapper = generateWrapper()
    const sidebar = findByTestAttr(wrapper, 'sidebar')

    expect(sidebar.props().open).toEqual(true)
  })

  it(`shouldn't contain opened sidebar if prop 'isSidebarOpened=false' and width not desktop`, () => {
    useMediaQuery.mockImplementation(() => false)
    wrapper = generateWrapper({ isSidebarOpened: false })
    const sidebar = findByTestAttr(wrapper, 'sidebar')

    expect(sidebar.props().open).toEqual(false)
  })

  it(`should contain opened sidebar if prop 'isSidebarOpened=false' and width is desktop`, () => {
    useMediaQuery.mockImplementation(() => true)
    wrapper = generateWrapper({ isSidebarOpened: false })
    const sidebar = findByTestAttr(wrapper, 'sidebar')

    expect(sidebar.props().open).toEqual(true)
  })
})
// useMediaQuery.mockImplementation(() => false)
