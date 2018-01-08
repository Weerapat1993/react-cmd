import { ModelArray } from '../utils'

// Models
export const User = (data) => ModelArray(data, 'id')
export const Category = (data) => ModelArray(data, 'id')
export const Product = (data) => ModelArray(data, 'id')