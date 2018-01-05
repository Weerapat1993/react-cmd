const fs = require('fs')
const path = require('path')
const Log = require('./Log')

class MakeFile extends Log {
  constructor(cmd, env) {
    super()
    this.cmd = cmd
    this.env = env || null
  }

  createDirectory(pathName) {
    const dir = path.join(__dirname, `../../src${pathName}`)
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
      this.success(`create Directory ./src${pathName}`)
    }
    return this
  } 
  

  createFile(pathName, text) {
    const dir = path.join(__dirname, `../../src${pathName}`)
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, text)
      this.success(`create File ./src${pathName} success.`)
    } else {
      this.error(`file ./src${pathName} is exists.`)
    }

    return this
  }
}

module.exports = MakeFile
