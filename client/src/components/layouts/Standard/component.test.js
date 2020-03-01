import React from 'react'
import { shallow } from 'enzyme'

import StandardLayout from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('StandardLayout component', () => {
  let wrapper
  const testContent = 'test content'
  const initialProps = {
    callForUserDeletionRequest: jest.fn(),
    children: <p>{testContent}</p>,
  }
  const dataTestMain = 'main'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<StandardLayout {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should contain correct children in main', () => {
    const main = findByTestAttr(wrapper, dataTestMain)

    expect(main.find('p').text()).toEqual(testContent)
  })
})
