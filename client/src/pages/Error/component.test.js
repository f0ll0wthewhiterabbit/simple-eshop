import React from 'react'
import { shallow } from 'enzyme'

import ErrorPage from './component'
import findByTestAttr from '../../utils/findByTestAttr'
import { PAGE_PATHS } from '../../constants'

describe('ErrorPage component', () => {
  let wrapper
  const initialProps = {
    isAdmin: false,
    location: null,
  }
  const defaultTitle = 'Page not found'
  const dataTestErrorMessage = 'errorMessage'
  const dataTestBackLink = 'backLink'

  const generateWrapper = passedProps => {
    const defaultProps = { ...initialProps }
    const props = { ...defaultProps, ...passedProps }

    return shallow(<ErrorPage {...props} />)
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`should pass default title to ErrorMessage`, () => {
    const errorMessage = findByTestAttr(wrapper, dataTestErrorMessage)

    expect(errorMessage.props().title).toBe(defaultTitle)
  })

  it(`should pass no children to ErrorMessage`, () => {
    const errorMessage = findByTestAttr(wrapper, dataTestErrorMessage)

    expect(errorMessage.props().children).toBe('')
  })

  it(`should contain link to main page`, () => {
    const backLink = findByTestAttr(wrapper, dataTestBackLink)

    expect(backLink.props().to).toBe(PAGE_PATHS.HOME)
  })

  it(`should contain link to admin products page in admin mode`, () => {
    wrapper = generateWrapper({ isAdmin: true })
    const backLink = findByTestAttr(wrapper, dataTestBackLink)

    expect(backLink.props().to).toBe(PAGE_PATHS.ADMIN_PRODUCTS)
  })

  describe('passed location to props', () => {
    const locationTitle = 'Title From Location'
    const locationMessage = 'Message From Location'

    beforeEach(() => {
      wrapper = generateWrapper({
        location: {
          state: {
            title: locationTitle,
            backTo: PAGE_PATHS.SIGN_UP,
            message: locationMessage,
          },
        },
      })
    })

    it('should pass title from location prop to ErrorMessage', () => {
      const errorMessage = findByTestAttr(wrapper, dataTestErrorMessage)

      expect(errorMessage.props().title).toBe(locationTitle)
    })

    it(`should pass message from location prop to ErrorMessage's children`, () => {
      const errorMessage = findByTestAttr(wrapper, dataTestErrorMessage)

      expect(errorMessage.props().children).toBe(locationMessage)
    })

    it(`should contain link from location prop`, () => {
      const backLink = findByTestAttr(wrapper, dataTestBackLink)

      expect(backLink.props().to).toBe(PAGE_PATHS.SIGN_UP)
    })
  })
})
