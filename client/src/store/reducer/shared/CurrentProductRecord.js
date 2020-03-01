import { Record, List } from 'immutable'

export const CurrentProductRecord = Record({
  id: '',
  title: '',
  description: '',
  price: null,
  imageName: '',
  tags: List(),
  rating: List(),
})
