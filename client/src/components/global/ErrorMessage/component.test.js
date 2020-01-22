import React from 'react'
import { shallow } from 'enzyme'

import ErrorMessage from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('ErrorMessage component', () => {
  let wrapper
  const initialProps = {
    children: '',
    title: '',
  }
  const dataTestHeading = 'heading'
  const dataTestMessage = 'message'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<ErrorMessage {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`shouldn't contain title`, () => {
    const title = findByTestAttr(wrapper, dataTestHeading)

    expect(title).toHaveLength(0)
  })

  it(`shouldn't contain message`, () => {
    const message = findByTestAttr(wrapper, dataTestMessage)

    expect(message).toHaveLength(0)
  })

  it(`should contain title passed from props`, () => {
    const testTitle = 'Test Title'
    wrapper = generateWrapper({ title: testTitle })
    const title = findByTestAttr(wrapper, dataTestHeading)

    expect(title).toHaveLength(1)
    expect(title.text()).toBe(testTitle)
  })

  it(`should contain message passed as children`, () => {
    const testMessage = 'Test Message'
    wrapper = generateWrapper({ children: testMessage })
    const message = findByTestAttr(wrapper, dataTestMessage)

    expect(message).toHaveLength(1)
    expect(message.text()).toBe(testMessage)
  })
})
