import ArrayCollection from './arrayCollection'
import ObjectCollection from './ObjectCollection'

export const ModelObject = (data, primaryKey) => new ObjectCollection(data, primaryKey)
export const ModelArray = (data, primaryKey) => new ArrayCollection(data, primaryKey)