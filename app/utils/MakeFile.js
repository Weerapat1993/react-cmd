const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const cmd = require('node-cmd')
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
        this.success(`create directory ./src${pathName}`)
      }
    }
    return this
  } 
  

  createFile(pathName, text) {
    const dir = srcPath(pathName, this.pwd)
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, text)
      this.success(`create file ./src${pathName} success.`)
    } else {
      this.error(`file ./src${pathName} is exists.`)
    }
    return this
  }

  copyFolderTemplate(templateName, pathName) {
    const dirTemplate = templatePath(templateName, this.pwd)
    const dirSrc = srcPath(pathName, this.pwd)
    if (!fs.existsSync(dirSrc)) {
      this.createDirectory(pathName, true)
      fse.copySync(dirTemplate, dirSrc);
      this.success(`copy folder ${templateName} to ./src${pathName} success.`)
    } else {
      this.error(`folder ./src${pathName} is exists.`)
    }
    return this
  }

  copyFile(templateName, pathName) {
    const dirTemplate = templatePath(templateName, this.pwd)
    const dirSrc = srcPath(pathName, this.pwd)
    if (!fs.existsSync(dirSrc)) {
      fs.copyFileSync(dirTemplate, dirSrc)
      this.success(`copy file ${templateName} to ./src${pathName} success.`)
    } else {
      this.error(`file ./src${pathName} is exists.`)
    }
    return this
  }

  removeFolder(pathName) {
    const dirSrc = srcPath(pathName, this.pwd)
    if (fs.existsSync(dirSrc)) {
      fse.removeSync(dirSrc)
      this.success(`remove file ./src${pathName} success.`)
    }
    return this
  }

  runCommand(commandName) {
    this.default('\n  Installing Node Modules ...\n')
    cmd.get(commandName, (err, data, stderr) => {
      if (!err) {
         this.success('the node-cmd cloned dir contains these files :\n\n', data)
      } else {
         this.error('error', err)
      }
    })
    return this
  }
}

module.exports = MakeFile
