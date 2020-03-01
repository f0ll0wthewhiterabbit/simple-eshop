import { Record } from 'immutable'

import { ROLES } from '../../../constants'

export const UserRecord = Record({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: ROLES.GUEST,
  isRemovable: false,
})
