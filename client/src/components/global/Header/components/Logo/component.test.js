import React from 'react'
import { shallow } from 'enzyme'

import Logo from './component'
import findByTestAttr from '../../../../../utils/findByTestAttr'

describe('Logo component', () => {
  let props
  let wrapper

  const generateWrapper = passedProps => {
    const defaultProps = {
      isAdmin: false,
    }
    props = { ...defaultProps, ...passedProps }

    return shallow(<Logo {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render', () => {
    expect(wrapper).toHaveLength(1)
  })

  it('should contain proper text in LogoTitle', () => {
    const logoTitle = findByTestAttr(wrapper, 'LogoTitle')

    expect(logoTitle.text()).toBe('simple eShop')
  })

  it(`should contain 'data-justify=flex-start' prop`, () => {
    expect(wrapper.prop('data-justify')).toBe('flex-start')
  })

  it(`should contain 'data-justify=center' prop in admin mode`, () => {
    wrapper = generateWrapper({ isAdmin: true })

    expect(wrapper.prop('data-justify')).toBe('center')
  })
})
