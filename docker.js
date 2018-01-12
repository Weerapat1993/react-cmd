const inquirer = require('inquirer');
const path = require('path')
const Case = require('case')
const chalk = require('chalk')
const shell = require('shelljs')
const fs = require('fs-extra')
const Table = require('cli-table2')
const dockerFile = require('./docker_pull.json')
const createTable = (head) => new Table({
  head,
  chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' } 
})
// ---------------------------
const tableContainer = createTable(['CONTAINER ID', 'IMAGE', 'DESCRIPTION', 'STATUS', 'NAMES'])
const dockerStatus = dockerFile.images.map(item => ([
  item.containerID,
  item.image,
  item.command,
  item.status,
  item.name,
]))
tableContainer.push(...dockerStatus)
console.log(tableContainer.toString())
// ---------------------------

const dir = (pathName) => path.join(__dirname, pathName)
const dockerJSON = dir('./docker_pull.json')

const INQUIRER = {
  list: 'list',
  rawlist: 'rawlist',
  expand: 'expand',
  checkbox: 'checkbox',
  confirm: 'confirm',
  input: 'input',
  password: 'password',
}

const COMMANDS = {
  PS_ALL: "Docker Status",
  PULL: "Docker Pull Image",
  IMAGES: "Docker Images",
  CREATE_CONTAINER: "Create Docker Container",
}

const runInquirer = async () => {
  const dockerPull = fs.readJsonSync(dockerJSON)
  const data = await inquirer.prompt([
    {
      type: INQUIRER.list,
      name: "docker_type",
      message: "What do you want?",
      choices: Object.keys(COMMANDS).map((key) => COMMANDS[key]),
      filter: (value) => Case.snake(value)
    }
  ])
  let cmdName = ''
  switch(data.docker_type) {
    // Docker Status
    case Case.snake(COMMANDS.PS_ALL):
      cmdName = 'docker ps -a'
      break
    // Docker Pull Image
    case Case.snake(COMMANDS.PULL):
      const image = await inquirer.prompt([
        {
          type: INQUIRER.input,
          name: "name",
          message: "Docker Image Name:",
        }
      ])
      cmdName = `docker pull ${image.name}`
      let checkPull = false
      dockerPull.require.forEach(item => {
        checkPull = item === image.name
      })
      let fileJson = {}
      if(!checkPull) {
        fileJson = {
          ...dockerPull,
          require: [
            ...dockerPull.require,
            image.name,
          ]
        }
      } else {
        fileJson = dockerPull
      }
      fs.writeFileSync(dockerJSON, JSON.stringify(fileJson, null, '  '))
      break
    // Docker Pull Image
    case Case.snake(COMMANDS.IMAGES):
      cmdName = 'docker images'
      break
    // Create Docker Container
    case Case.snake(COMMANDS.CREATE_CONTAINER):
      const dockers = dockerPull.require.map(item => ({
        name: item
      }))
      const container = await inquirer.prompt([
        {
          type: INQUIRER.input,
          name: "name",
          message: "Container Name:",
          filter: (value) => Case.snake(value) || 'container_name'
        },
        {
          type: INQUIRER.input,
          name: "publish_port",
          message: "Publish Port:",
          validate: (value) => validateNumber(value),
          filter: (value) => value || 80
        },
        {
          type: INQUIRER.input,
          name: "docker_port",
          message: "Docker Port:",
          validate: (value) => validateNumber(value),
          filter: (value) => value || 80
        },
        {
          type: INQUIRER.input,
          name: "publish_volume",
          message: "Publish Volume:",
          filter: (value) => value || '/web'
        },
        {
          type: INQUIRER.input,
          name: "docker_volume",
          message: "Docker Volume:",
          filter: (value) => value || '/var/www/html'
        },
        {
          type: INQUIRER.checkbox,
          name: "images",
          message: "Docker Images:",
          choices: dockers,
          filter: (value) => value.join(' '),
          validate: (answer) => {
            if (answer.length < 1) {
              return 'You must choose at least one.';
            }
            return true;
          }
        },
      ])
      cmdName = `docker run --name ${container.name} -p ${container.publish_port}:${container.docker_port} -v ${container.publish_volume}:${container.docker_volume} -d ${container.images}`
      break
    default:
      cmdName = ''
  }
  if(cmdName) {
    console.log(`\nCommand: ${chalk.green(`${cmdName}\n`)}`)
    const confirm = await inquirer.prompt([
      {
        type: INQUIRER.confirm,
        name: "isConfirm",
        message: "Do you want to start docker command?",
      }
    ])
    if(confirm.isConfirm) {
      createImagesJSON(cmdName)
    } else {
      console.log(chalk.red('Error: Exit.'))
    }
  } else {
    console.log(chalk.red('Error: Command is not found.'))
  }
}

/**
 * Validate Number
 * @param {*} value 
 * @return {string}
 */
const validateNumber = (value) => {
  const pass = value.match(
    /^[1-9]\d*$/gm
  )
  if (!value) return 'Please enter a valid number' 
  if (pass) return true
  return 'Please enter a valid number'
}

/**
 * Create Images JSON
 * @param {string} cmdName
 */
const createImagesJSON = (cmdName) => {
  const imagesJSON = []
  const dockerPull = fs.readJsonSync(dockerJSON)
  shell.exec(cmdName, { async: true }, (code, stdout, stderr) => {
    const data = stdout.split('\n')
    for(let i = 1; i < data.length - 1; i++) {
      const data2 = data[i].split('       ')
      const dataTrim = data2.map(item => item.trim())
      const dataJSON = {
        containerID: dataTrim[0],
        image: dataTrim[1],
        command: dataTrim[2],
        status: dataTrim[3],
        name: dataTrim[6],
      }
      imagesJSON.push(dataJSON)
    }
    let fileJson = {
      ...dockerPull,
      images: imagesJSON,
    }
    fs.writeFileSync(dockerJSON, JSON.stringify(fileJson, null, '  '))
  })
}

runInquirer()