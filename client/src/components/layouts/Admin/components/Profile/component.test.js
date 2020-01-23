import React from 'react'
import { shallow } from 'enzyme'

import Profile from './component'
import findByTestAttr from '../../../../../utils/findByTestAttr'

describe('Profile component', () => {
  let wrapper
  const initialProps = {
    firstName: 'John',
    lastName: 'Doe',
  }
  const dataTestAvatar = 'avatar'
  const dataTestName = 'name'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<Profile {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should contain correct abbreviation in avatar', () => {
    const avatar = findByTestAttr(wrapper, dataTestAvatar)

    expect(avatar.text()).toBe('J D')
  })

  it('should contain correct name and surname', () => {
    const name = findByTestAttr(wrapper, dataTestName)

    expect(name.text()).toBe('John Doe')
  })
})
