import axios from 'axios'
import { API_DEVELOPMENT_URL, API_PRODUCTION_URL } from '../constants'

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? API_PRODUCTION_URL : API_DEVELOPMENT_URL

export default axios.create({
  baseURL: BASE_URL,
})
