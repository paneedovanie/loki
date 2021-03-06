const showFields = ['_id', 'firstName', 'lastName', 'email', 'role', 'username', 'verified', 'createdAt', 'updatedAt', 'deletedAt']
const crud = require( `${ __srcdir }modules/User/controllers/user.controller` )
const { hashPassword } = require( `${ __srcdir }helpers/string.helper` )
const roleCrud = require( `${ __srcdir }modules/Role/controllers/role.controller` )
const ora = require('ora');
const chalk = require("chalk");
const inquirer = require('inquirer');

exports.createUser = async function () {
    const questions = [];
    questions.push({
        type: 'input',
        name: 'firstName',
        message: 'First name: ',
        validate: async (input) => {
            if (input.length === 0) return 'First name is required'

            return true;
        }
    });
    questions.push({
        type: 'input',
        name: 'lastName',
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

    const roles = await roleCrud.read()
    
    questions.push({
        type: 'rawlist',
        name: 'role',
        message: 'Role: ',
        choices: roles.map(item => item.name),
        default: 0
    });
    let answers = await inquirer.prompt(questions);

    let spinner = ora('Creating user...').start();

    try {

        answers.password = hashPassword(answers.password)
        answers.role = roles.find(e => e.name === answers.role)._id
        let user = await crud.create(answers)
        
        user = user._doc
        delete user.password
        console.log(chalk.green.bold("\nThe user created successfully\n"))
        console.log(`| ${user.firstName + " " + user.lastName} | ${user.email} | ${user.username} |`)
    }
    catch (e) {
        console.error(e)
    } 
    finally {
        spinner.stop()
    }
}