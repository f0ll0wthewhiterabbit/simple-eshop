import React from 'react'
import { shallow } from 'enzyme'

import Footer from './component'

describe('Footer component', () => {
  it('should render correctly', () => {
    const currentDate = new Date()
    const RealDate = Date
    global.Date = jest.fn(() => new RealDate(currentDate.toISOString()))
    Object.assign(Date, RealDate)

    const wrapper = shallow(<Footer />)

    expect(wrapper).toMatchSnapshot()
  })
})
