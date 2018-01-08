const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const Log = require('./Log')
const srcPath = (pathName, pwd) => `${pwd}/src${pathName}`
const templatePath = (pathName, pwd) => `/usr/local/lib/node_modules/react-cmd/app/templates${pathName}`

class MakeFile extends Log {
  constructor(cmd, env, pwd) {
    super()
    this.cmd = cmd
    this.env = env || null
    this.pwd = pwd
  }

  createDirectory(pathName, hideLog) {
    const dir = srcPath(pathName, this.pwd)
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
      if(!hideLog) {
        this.success(`create directory ${dir}`)
      }
    }
    return this
  } 
  

  createFile(pathName, text) {
    const dir = srcPath(pathName, this.pwd)
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, text)
      this.success(`create file ${dir} success.`)
    } else {
      this.error(`file ${dir} is exists.`)
    }
    return this
  }

  copyFolderTemplate(templateName, pathName) {
    const dirTemplate = templatePath(templateName, this.pwd)
    const dirSrc = srcPath(pathName, this.pwd)
    if (!fs.existsSync(dirSrc)) {
      this.createDirectory(pathName, true)
      fse.copySync(dirTemplate, dirSrc);
      this.success(`copy folder ${dirTemplate} to ${dirSrc} success.`)
    } else {
      this.error(`folder ${dirSrc} is exists.`)
    }
    return this
  }

  copyFile(templateName, pathName) {
    const dirTemplate = templatePath(templateName, this.pwd)
    const dirSrc = srcPath(pathName, this.pwd)
    if (!fs.existsSync(dirSrc)) {
      fs.copyFileSync(dirTemplate, dirSrc)
      this.success(`copy file ${dirSrc} success.`)
    } else {
      this.error(`file ${dirSrc} is exists.`)
    }
    return this
  }

  removeFolder(pathName) {
    const dirSrc = srcPath(pathName, this.pwd)
    console.log(dirSrc)
    if (fs.existsSync(dirSrc)) {
      fse.removeSync(dirSrc)
      this.success(`remove file ${dirSrc} success.`)
    }
    return this
  }
}

module.exports = MakeFile
