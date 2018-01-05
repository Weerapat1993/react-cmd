const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const Log = require('./Log')
const srcPath = (pathName) => path.join(__dirname, `../../src${pathName}`)
const templatePath = (pathName) => path.join(__dirname, `../templates${pathName}`)

class MakeFile extends Log {
  constructor(cmd, env) {
    super()
    this.cmd = cmd
    this.env = env || null
  }

  createDirectory(pathName, hideLog) {
    const dir = srcPath(pathName)
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
      if(!hideLog) {
        this.success(`create Directory ./src${pathName}`)
      }
    }
    return this
  } 
  

  createFile(pathName, text) {
    const dir = srcPath(pathName)
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, text)
      this.success(`create File ./src${pathName} success.`)
    } else {
      this.error(`file ./src${pathName} is exists.`)
    }
    return this
  }

  copyFolderTemplate(templateName, pathName) {
    const dirTemplate = templatePath(templateName)
    const dirSrc = srcPath(pathName)
    if (!fs.existsSync(dirSrc)) {
      this.createDirectory(pathName, true)
      fse.copySync(dirTemplate, dirSrc);
      this.success(`copy folder ./app/templates${templateName} to ./src${pathName} success.`)
    } else {
      this.error(`folder ./src${pathName} is exists.`)
    }
    return this
  }
}

module.exports = MakeFile
