import React from 'react'
import { shallow } from 'enzyme'

import Logo from './component'

describe('Logo component', () => {
  let wrapper
  const initialProps = {
    isAdmin: false,
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

  it(`should contain 'data-justify=flex-start' prop`, () => {
    expect(wrapper.prop('data-justify')).toBe('flex-start')
  })

  it(`should contain 'data-justify=center' prop in admin mode`, () => {
    wrapper = generateWrapper({ isAdmin: true })

    expect(wrapper.prop('data-justify')).toBe('center')
  })
})
