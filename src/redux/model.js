import { ArrayCollection } from '../utils'

const Model = (data, primaryKey) => new ArrayCollection(data, primaryKey)

// Models
export const User = (data) => Model(data, 'id')
export const Category = (data) => Model(data, 'id')
export const Product = (data) => Model(data, 'id')