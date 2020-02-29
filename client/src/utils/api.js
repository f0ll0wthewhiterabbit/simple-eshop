import axios from 'axios'
import { URLS } from '../constants'

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? URLS.API_PRODUCTION : URLS.API_DEVELOPMENT

export default axios.create({
  baseURL: BASE_URL,
})
