const mongoose = require('mongoose')
require('dotenv').config()

const roleCrud = require( `${ __srcdir }modules/Role/controllers/role.controller` )
const categoryCrud = require( `${ __srcdir }modules/Category/controllers/category.controller` )
const permissionCrud = require( `${ __srcdir }modules/Permission/controllers/permission.controller` )
const rolePermissionCrud = require( `${ __srcdir }modules/Role/submodules/Permission/controllers/rolePermission.controller` )


const ora = require('ora');
const chalk = require("chalk");
import inquirer from 'inquirer';

exports.connect = async function () {
	await mongoose.connect(process.env.DB_CONNECTION, 
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	)
}

exports.close = async function () {
    await mongoose.disconnect()
}

exports.reset = async function () {
    let questions = []

    questions.push({
        type: 'confirm',
        name: 'choice',
        message: 'The database data will be deleted permanently.\nAre you sure to reset the database?',
        default: false,
    })

    let answers = await inquirer.prompt(questions);
    if(!answers.choice) return false
    let spinner = ora('Resetting database...').start();

    try {
        const collections = await mongoose.connection.db.collections()
      
        for (let collection of collections) {
          await collection.drop()
        }
        console.log(chalk.green.bold("\nThe database reset successfully\n"))
        return true
    } catch (err) { console.error(err) } 
    finally {
        spinner.stop()
    }
}

exports.seed = async function () {
    const roles = ['Superadmin', 'Admin', 'User']
    let rolesID = [];
    const permissions = require('../assets/permissions')

    let spinner = ora('Populating database...').start();

    try {
        for (const role of roles) {
            rolesID.push(await roleCrud.create({name: role}))
        }
        
        for(var i = 0; i < permissions.length; i++) {
            const category = await categoryCrud.create({name: permissions[i].category, type: 'permission'})
            for (const permission of permissions[i].data) {
                const permissionAdded = await permissionCrud.create({...permission, category: category._id})
                await rolePermissionCrud.create({role: rolesID[0], permission: permissionAdded._id})
            }
        }

        console.log(chalk.green.bold("\nThe database was populated successfully\n"))
    } catch (err) { console.error(err) } 
    finally {
        spinner.stop()
    }
}