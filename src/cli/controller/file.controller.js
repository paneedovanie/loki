var fs = require('fs')
const chalk = require("chalk")
const pluralize = require('pluralize')
const requireContext = require('node-require-context')
const inquirer = require('inquirer')

exports.createModule = async function (name) {
  const modelPath = await checkAndGetModel( name ) 
  if( !modelPath ) return

  if(name === '' || !name) {
    console.log(chalk.red.bold("\nPlease add module name.\n"))
    return
  }

  const moduleName = name.charAt(0).toUpperCase() + name.substring(1)
  const path = `${ __srcdir }modules/${moduleName}`
  if (fs.existsSync( path )){
    console.log(chalk.red.bold("\nThe module already exists.\n"))
    return
  }

  createModuleFiles(path, name, null, null, modelPath)

  console.log(chalk.green.bold("\nThe module created successfully.\n"))
}

exports.createSubModule = async function (module, name) {
  const modelPath = await checkAndGetModel( name ) 
  if( !modelPath ) return

  if(name === '' || !name) {
    console.log(chalk.red.bold("\nPlease add sub module name.\n"))
    return
  }

  const moduleName = module.charAt(0).toUpperCase() + module.substring(1)
  const subModuleName = name.charAt(0).toUpperCase() + name.substring(1)

  const modulePath = `${ __srcdir }modules/${moduleName}`
  const path = `${modulePath}/submodules/${subModuleName}`
  if (!fs.existsSync( modulePath )){
    console.log(chalk.red.bold("\nThe module doesn't exists.\n"))
    return
  }

  if(moduleName === subModuleName) {
    console.log(chalk.red.bold("\nThe sub module must not the same as module.\n"))
    return
  }

  createModuleFiles(path, name, modulePath, moduleName, modelPath)

  console.log(chalk.green.bold("\nThe module created successfully.\n"))
}

async function checkAndGetModel ( name ) {
  let files = requireContext("../..", true, new RegExp(`(modules)\\/\\w+\\/(models)\\/${name}\\.js`))
  if(files.keys().length === 0)
    files = requireContext("../..", true, new RegExp(`(modules)\\\\\\w+\\\\(models)\\\\${name}\\.js`))

  if(files.keys().length > 0) {
    console.log(chalk.red.bold("\nPlease change module name. Model already exists.\n"))
    let questions = []
    questions.push({
      type: 'rawlist',
      name: 'proceed',
      message: 'Do you want to use the existing model?',
      choices: ['Yes', 'No']
    });

    const answers = await inquirer.prompt(questions);

    let indexes = []

    const modelPath = files.keys()[0]

    modelPath.split('').forEach((item, i) => {
      if(item === '/') indexes.push(i)
    })

    switch(answers.proceed) {
      case 'Yes': 
        return modelPath.substring((indexes[indexes.length - 3]) + 1, indexes[indexes.length - 2])
      case 'No':
        return
    }
  }
}

function createModuleFiles (path, name, parent, parentName, modelPath = null) {
  const moduleNameLower = name.toLowerCase()
  const parentModuleNameLower = parentName ? parentName.toLowerCase() : ''
  modelPath = modelPath || parentName

  fs.mkdirSync( path, { recursive: true } );

  const files = [
    {
      name: '/controllers/api/v1',
      type: 'dir'
    },
    {
      name: `/controllers/api/v1/${moduleNameLower}.controller.js`,
      content: `const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const ${moduleNameLower}Controller = require('../../${moduleNameLower}.controller')

class ApiRoleController extends ApiController {
  constructor (props) {
    super(props)
  }
}

module.exports = new ApiRoleController(${moduleNameLower}Controller)`,
      type: 'file',
    },
    {
      name: `/controllers/${moduleNameLower}.controller.js`,
      content: `const Crud = require(__srcdir + 'core/controllers/core.controller')
const ${name} = require(\`${parent ? '${ __srcdir }modules/'+modelPath+'/models' : '../models'}/${name}\`)

class ${name}Controller extends Crud {
  constructor(model) {
    super(model)
  }
}

module.exports = new ${name}Controller(${name})`,
      type: 'file',
    },
    {
      name: '/models',
      type: 'dir',
      ignore: parent || modelPath ? true : false
    },
    {
      name: `/models/${name}.js`,
      content: `const mongoose = require('mongoose');
const Owner = require( \`$\{ __srcdir }core/models/fields/Owner\` );
const SoftDelete = require( \`$\{ __srcdir }core/models/fields/SoftDelete\` )

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique : true,
        max: 255
    },
    ...SoftDelete,
    ...Owner
}, {timestamps: true});

module.exports = mongoose.model('${name}', schema)`,
      type: 'file',
      path: parent,
      ignore: modelPath ? true : false
    },
    {
      name: '/routes/middlewares',
      type: 'dir',
    },
    {
      name: `/routes/middlewares/${moduleNameLower}.middleware.js`,
      content: `const controller = require('../../controllers/${moduleNameLower}.controller')
  const joi = require('@hapi/joi')
  joi.objectId = require('joi-objectid')(joi);
  const { filterJoiErrors } = require( __srcdir + 'helpers/error.helper')
  
  exports.validation = async function (req, res, next) {
    const joiSchema = joi.object({
      name: joi.string().required().max(255),
    });
  
    const validInput = joiSchema.validate(req.body)
    if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)})
  
    let result = await controller.isExists(req.params.id, 'name', req.body.name)
    if(result) return res.status(400).json({errors: ["name exists"]})
  
    next()
  }
  
  exports.checkIfValidId = async function (req, res, next) {
    const joiSchema = joi.object({
      id: joi.objectId().required()
    });
  
    const validInput = joiSchema.validate({ id: req.params.id });
    if(validInput.error) return res.status(400).json({errors: ['Wrong ID format']});
  
    let result = await controller.readOneById(req.params.id)
    if(!result) return res.status(400).json({errors: ["${moduleNameLower} doesn't exists"]})
  
    next()
  }`,
      type: 'file',
    },
    {
      name: '/routes/api.js',
      content: `const apiVer = 'v1'
const CoreRoute = require(\`$\{ __srcdir }/core/routes/core.routes\`)
const controller = require(\`../controllers/api/$\{apiVer}/${moduleNameLower}.controller\`)
const moduleName = '${moduleNameLower}'
const { 
  validation,
  checkIfValidId: checkId 
} = require('./middlewares/${moduleNameLower}.middleware')


let ${moduleNameLower}Routes = CoreRoute(moduleName, controller, { create: validation, update: validation, checkId })

module.exports = {
  routeName: \`/api/$\{apiVer}/${ parent ? parentModuleNameLower + '/' + pluralize(moduleNameLower) : pluralize(moduleNameLower) }\`,
  routes: ${moduleNameLower}Routes
}`,
      type: 'file'
    }
  ] 

  files.forEach(file => {
    if(file.type === 'dir' && !file.ignore) fs.mkdirSync( `${path}${file.name}`, { recursive: true }, (err) => {
      if(err) throw err
    })
    else if(file.type === 'file' && !file.ignore) {
      let pathToUse = path
      if(file.path) pathToUse = file.path
      fs.writeFileSync( `${pathToUse}${file.name}`, file.content, function (err) {
        if (err) throw err
      });  
    }
  })
} 