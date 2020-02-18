import React from 'react'
import { shallow } from 'enzyme'

import Logo from './component'

describe('Logo component', () => {
  let wrapper
  const initialProps = {
    isAdmin: false,
    isDarkTheme: false,
  }

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<Logo {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`should contain 'justify=flex-start' prop`, () => {
    expect(wrapper.prop('justify')).toBe('flex-start')
  })

  it(`should contain 'justify=center' prop in admin mode`, () => {
    wrapper = generateWrapper({ isAdmin: true })

    expect(wrapper.prop('justify')).toBe('center')
  })
})
