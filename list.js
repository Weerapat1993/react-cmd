const inquirer = require('inquirer');
const Case = require('case')

const INQUIRER = {
  list: 'list',
  rawlist: 'rawlist',
  expand: 'expand',
  checkbox: 'checkbox',
  confirm: 'confirm',
  input: 'input',
  password: 'password',
}

const runInquirer = async () => {
  const firstOption = await inquirer.prompt([
    {
      type: INQUIRER.list,
      name: 'type',
      message: 'Please select inquirer Type?',
      choices: [
        'list',
        'rawlist',
        'expand',
        'checkbox',
        'confirm',
        'input',
        'password',
        new inquirer.Separator(),
      ]
    },
    {
      type: INQUIRER.input,
      name: 'name',
      message: 'Name',
      filter: (value) => value ? Case.snake(value) : 'no_name'
    },
    {
      type: INQUIRER.input,
      name: 'message',
      message: 'Question',
      filter: (value) => value ? value : 'No Question'
    }
  ])
  console.log('Inquirer Type is:', firstOption.type)
  const choices = []
  let secondOption = {}
  switch(firstOption.type) {
    case INQUIRER.list:
    case INQUIRER.checkbox:
      let optionNumber = 0
      let choice = {
        loop: true

      }
      while(choice.loop) {
        optionNumber += 1
        choice = await inquirer.prompt([
          {
            type: INQUIRER.input,
            name: 'message',
            message: `Select Option ${optionNumber}`,
            filter: (value) => value ? value : `Empty Option ${optionNumber}`
          },
          {
            type: INQUIRER.confirm,
            name: 'loop',
            message: 'Do you want to add new option?',
          }
        ])
        choices.push(choice.message)
      }
      // console.log('\nChoices:\n')
      // console.log(JSON.stringify(choices, null, '  '))
      secondOption = { choices }
      break
    default:
  }
  let thirdOption = {}
  const filterOption = await inquirer.prompt([
    {
      type: INQUIRER.confirm,
      name: 'isFilter',
      message: 'Do you want to add filter?',
    }
  ])

  thirdOption = filterOption.isFilter ? { filter: '(value) => value' } : {}
  
  const fullData = {
    ...firstOption,
    ...secondOption,
    ...thirdOption,
  }
  console.log('\nAll Data:\n')
  console.log(JSON.stringify(fullData, null, '  '));
  console.log('\nExample:\n')
  const answers = await inquirer.prompt([fullData])
  console.log('\nAnswer:\n')
  console.log(JSON.stringify(answers, null, '  '));
}

runInquirer()

// inquirer
//   .prompt([
//     {
//       type: INQUIRER.list,
//       name: 'theme',
//       message: 'What do you want to do?',
//       choices: [
//         'Create Folder Redux',
//         'Create Folder Component',
//         'Create Folder Feature',
//         'Create Folder Form',
//         'Create Folder Page',
//         'Create Folder Util',
//         new inquirer.Separator(),
//       ]
//     },
//     {
//       type: INQUIRER.list,
//       name: 'size',
//       message: 'What size do you need?',
//       choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
//       filter: (val) => {
//         return val.toLowerCase();
//       }
//     }
//   ])
//   .then(answers => {
//     console.log(JSON.stringify(answers, null, '  '));
//   });