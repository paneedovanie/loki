require('../config')
const db = require('./controller/db.controller')
const { createUser } = require('./controller/user.controller')
const { createModule, createSubModule } = require('./controller/file.controller')

function parseIntoOptions(yargs) {
	return yargs
		.usage("Usage: db:reset - To reset database")
		.usage("Usage: db:seed - To reset and populate database")
		.usage("Usage: user:create - To create new user")
		.usage("Usage: make:module <Module Name> - To create new module")
		.usage("Usage: make:submodule <Module Name> <Sub Module Name> - To create new sub module")
		.alias('h', 'help')
		.help('help')
		.argv;
}

async function executeCommand(options) {
    if(!options._) return 
    
    if(options._[0].includes('db:')) {
			await db.connect()

			if(options._.includes('db:reset')) await db.reset()
			else if(options._.includes('db:seed')) { if( await db.reset() ) await db.seed() }
    }
    else if(options._.includes('make:user')) { 
			await db.connect() 
			await createUser() 
    }
    else if(options._.includes('make:module'))  await createModule(options._[1])
		else if(options._.includes('make:submodule'))  await createSubModule(options._[1], options._[2])
		
		db.close() 
}
   
export async function cli(yargs) { executeCommand( parseIntoOptions( yargs ) ) }