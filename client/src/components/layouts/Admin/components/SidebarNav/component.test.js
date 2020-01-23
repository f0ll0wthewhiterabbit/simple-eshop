import React from 'react'
import { shallow } from 'enzyme'

import SidebarNav from './component'
import findByTestAttr from '../../../../../utils/findByTestAttr'

describe('SidebarNav component', () => {
  let wrapper
  const initialProps = {
    closeSidebar: jest.fn(),
  }
  const dataTestNavigationLink = 'navigationLink'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<SidebarNav {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  afterEach(() => {
    initialProps.closeSidebar.mockReset()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should close sidebar after clicking the link', () => {
    const firstNavigationLink = findByTestAttr(wrapper, dataTestNavigationLink).first()
    firstNavigationLink.simulate('click')

    expect(initialProps.closeSidebar).toHaveBeenCalledTimes(1)
  })
})
