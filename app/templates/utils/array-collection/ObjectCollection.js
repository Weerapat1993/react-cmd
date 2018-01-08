import _ from 'lodash'

const WARN = 'warn'
const ERROR = 'error'
const ASC = 'asc'
const DESC = 'desc'
const STRING = 'string'
const NUMBER = 'number'

// Class Object Collection
class ObjectCollection {
  /**
   * Build Object Collection
   * ```javascript
   * const Collection = new ObjectCollection([{}], 'primaryKey')
   * ```
   * @param {[{}]} data
   * @param {string} primaryKey
   */
  constructor(data, primaryKey) {
    this.primaryKey = primaryKey || 'id'
    this.firstData = data || []
    this.data = data || []
    this.callback = (item) => item
  }

  checkTypeObject(type = ERROR) {
    if(typeof this.data === 'object') {
      return true
    } 
    console[type]('this data has not been normalize. Data it should be `Object` only.')
    return false
  }

  checkTypeArray(type = ERROR) {
    if(Array.isArray(this.data)) {
      return true
    } 
    console[type]('this data has been normalize already. Data it should be `Array` only.')
    return false
  }

  /**
   * Normalize Data from Object Key to Array
   * @return {this}
   */
  unnormalize() {
    const data = this.data
    if(this.checkTypeObject(WARN)) {
      this.data = Object.keys(data).map((key) => data[key])
    }
    return this
  }

  /**
   * Normalize Data from Array to Object Key 
   * @return {this}
   */
  normalize() {
    const newData = {}
    if(this.checkTypeArray(WARN)) {
      this.data.forEach((item) => {
        newData[_.get(item, this.primaryKey)] = item
      })
      this.data = newData
      this.firstData = newData
    }
    return this
  }


  /**
   * Fillable
   * @param {(item: {}) => this} callback 
   */
  fillable(callback) {
    const oldArray = this.data
    if(this.checkTypeArray()) {
      const newArray = oldArray.map(callback)
      this.callback = callback
      this.data = newArray
      return this
    }
  }

  /**
   * Find Key Data in Object 
   * @param {string} key 
   * @return {this}
   */
  find(key) {
    if(!this.checkTypeObject()) return undefined
    return this.where(this.primaryKey, '=', key)
  }

  /**
   * Find Data in Object
   * ```javascript
   * @condition [ === , !== , < , > , <= , >= ]
   * Collection.where('id','=','1')
   * ```
   * @param {'field'} field
   * @param {'condtion'} condition
   * @param {'expect'} expect
   * @return {this} collection
   */
  where(field, condition, expect) {
    if(!this.checkTypeObject()) return undefined
    const data = this.data
    const filter = (key) => {
      switch(condition) {
        case '>':
          return _.get(data[key], field) > expect
        case '>=':
          return _.get(data[key], field) >= expect
        case '<':
          return _.get(data[key], field) < expect
        case '<=':
          return _.get(data[key], field) <= expect
        case '!=':
        case '!==':
          return _.get(data[key], field) !== expect
        case '=':
        case '==':
        case '===':
        default:
          return _.get(data[key], field) === expect
      }
    }
    this.data = Object.keys(data).filter(filter).reduce((res, key) => Object.assign(res, { [key]: data[key] }), {} )
    return this
  }

  /**
   * 
   * @param {string} field 
   * @param {['sting']} arrayExpect 
   */
  whereIn(field, arrayExpect) {
    if(!this.checkTypeObject()) return undefined
    const oldData = arrayExpect.reduce((res, key) => Object.assign(res, { [key]: this.data[key] }), {} )
    this.data = oldData
    return this
  }

  /**
   * Get Length of Object
   * @return {number}
   */
  count() {
    return this.toArray().length
  }

  /**
   * Get Field in Data Object
   * 
   * @param {string} field
   * @return {{}} data
   */
  get() {
    return this.data
  }

  getByID(field) {
    if(field) {
      const arr = []
      if(!this.checkTypeObject()) return undefined
      Object.keys(this.data).forEach((key) => {
        arr.push(_.get(this.data[key], field))
      })
      return arr
    }
    return Object.keys(this.data)
  }

  orderBy(field, orderBy) {
    const data = this.data
    if(!this.checkTypeObject()) return undefined
    const arrayData = Object.keys(data).map((key) => data[key])
    let sortData = []
    if(arrayData.length) {
      const type = _.get(arrayData[0], field) && typeof _.get(arrayData[0], field)
      if(type === NUMBER) {
        // sort by value
        switch(orderBy) {
          case DESC:
            sortData = arrayData.sort((a, b) => _.get(b, field) - _.get(a, field))
            break
          case ASC: 
          default:
            sortData = arrayData.sort((a, b) => _.get(a, field) - _.get(b, field))
            break
        }
      } else if(type === STRING) {
        // sort by name
        switch(orderBy) {
          case DESC:
            sortData = arrayData.sort((a, b) => {
              const nameA = _.get(a, field).toUpperCase(); // ignore upper and lowercase
              const nameB = _.get(b, field).toUpperCase(); // ignore upper and lowercase
              if(nameB < nameA) return -1;
              if(nameB > nameA) return 1;
              return 0;
            })
            break
          case ASC: 
          default:
            sortData = arrayData.sort((a, b) => {
              const nameA = _.get(a, field).toUpperCase(); // ignore upper and lowercase
              const nameB = _.get(b, field).toUpperCase(); // ignore upper and lowercase
              if(nameA < nameB) return -1;
              if(nameA > nameB) return 1;
              return 0;
            })
            break
        }
      }
    }
    this.data = sortData
    this.normalize()
    return this
  }

  /**
   * Insert Data Key in Object
   * @param {[{ primaryKey: string }]} arrayData 
   * @return {{}}
   */
  insert(arrayData) {
    if(!this.checkTypeObject()) return undefined
    const oldData = this.data
    const newData = {}
    const arrayFillable = arrayData.map(this.callback)
    arrayFillable.forEach((item) => {
      newData[_.get(item, this.primaryKey)] = item
    })
    return {
      ...oldData,
      ...newData,
    }
  }

  /**
   * Update Data into object
   * @param {{}} object
   * @return {{}} 
   */
  update(object) {
    if(!this.checkTypeObject()) return undefined
    const lastArray = Object.keys(this.data)
    const updateData = lastArray.reduce((res, key) => Object.assign(res, { [key]: { ...this.data[key], ...object } }), {} )
    const firstData = this.firstData
    const newData = {
      ...firstData,
      ...updateData
    }
    return newData
  }

  /**
   * Normalize Data to Array
   * @return {[]}
   */
  toArray() {
    const data = this.data
    if(this.checkTypeObject(WARN)) {
      return Object.keys(data).map((key) => data[key])
    }
    return data
  }

   /**
   * Normalize Data to Object Key 
   * @return {this}
   */
  toObject() {
    if(this.checkTypeArray(WARN)) {
      const newData = {}
      this.data.forEach((item) => {
        newData[_.get(item, this.primaryKey)] = item
      })
      return newData
    }
    return this.data
  }
}

export default ObjectCollection