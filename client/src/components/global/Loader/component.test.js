import React from 'react'
import { shallow } from 'enzyme'

import Loader from './component'

describe('Loader component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Loader />)

    expect(wrapper).toMatchSnapshot()
  })
})
