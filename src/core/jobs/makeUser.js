const
  { query } = require('../../helpers/database.helper'),
  databaseLoader = require("../../loaders/database"),
  inquirer = require('inquirer'),
  RoleService = require('../modules/role/services/role.service'),
  roleService = new RoleService,
  UserService = require('../modules/user/services/user.service'),
  userService = new UserService

module.exports = async () => {
  global.database = await databaseLoader()

  const questions = [];
  questions.push({
    type: 'input',
    name: 'first_name',
    message: 'First name: ',
    validate: async (input) => {
      if (input.length === 0) return 'First name is required'

      return true;
    }
  });
  questions.push({
    type: 'input',
    name: 'last_name',
    message: 'Last name: ',
    validate: async (input) => {
      if (input.length === 0) return 'Last name is required'

      return true;
    }
  });
  questions.push({
    type: 'input',
    name: 'email',
    message: 'E-mail: ',
    validate: async (input) => {
      if (input.length === 0) return 'E-mail is required'

      return true;
    }
  });
  questions.push({
    type: 'input',
    name: 'username',
    message: 'Username: ',
    validate: async (input) => {
      if (input.length === 0) return 'Username is required'

      return true;
    }
  });
  questions.push({
    type: 'input',
    name: 'password',
    message: 'Password: ',
    validate: async (input) => {
      if (input.length === 0) return 'Password is required'

      return true;
    }
  });

  const roles = await roleService.getAll()

  questions.push({
    type: 'rawlist',
    name: 'role',
    message: 'Role: ',
    choices: roles.map(item => item.title),
    default: 0
  });
  let answers = await inquirer.prompt(questions);

  console.log('\x1b[33m%s\x1b[0m', 'Creating user...')

  try {
    const rolesResult = await query(`SELECT id FROM roles WHERE title = '${answers.role}'`)
    answers.role_id = rolesResult[0].id
    delete answers.role

    await userService.store(answers)
    delete answers.password

    console.log('\x1b[32m%s\x1b[0m', "\nUser created\n")
    console.log(`| ${answers.first_name + " " + answers.last_name} | ${answers.email} | ${answers.username} |`)
  } catch (e) {
    console.log(e)
  }

  database.end()
}