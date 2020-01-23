import React from 'react'
import { shallow } from 'enzyme'

import ProfilePage from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('ProfilePage component', () => {
  let wrapper
  const initialProps = {
    firstName: 'John',
    lastName: 'Doe',
  }
  const dataTestAvatar = 'avatar'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<ProfilePage {...props} />)
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
})
