import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Logo from './component'

export default {
  title: 'Logo',
  component: Logo,
  decorators: [
    story => (
      <Router>
        <div style={{ backgroundColor: 'dodgerblue' }}>{story()}</div>
      </Router>
    ),
  ],
}

export const normal = () => <Logo isAdmin={false} />
export const adminMode = () => <Logo isAdmin />
