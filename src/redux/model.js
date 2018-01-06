import Collection from 'array-collection'

const Model = (data, primaryKey) => new Collection(data, primaryKey)

// Models
export const User = (data) => Model(data, 'id')
export const Category = (data) => Model(data, 'id')
export const Product = (data) => Model(data, 'id')