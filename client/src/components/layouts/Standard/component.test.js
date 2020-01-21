import React from 'react'
import { shallow } from 'enzyme'

import StandardLayout from './component'
import findByTestAttr from '../../../utils/findByTestAttr'

describe('StandardLayout component', () => {
  let props
  let wrapper
  const testContent = 'test content'
  const testChildren = <p>{testContent}</p>

  const generateWrapper = passedProps => {
    const initialProps = {
      requestUserDeletion: jest.fn(),
      children: testChildren,
    }
    props = { ...initialProps, ...passedProps }

    return shallow(<StandardLayout {...props} />)
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
})
