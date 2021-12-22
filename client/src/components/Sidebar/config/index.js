let config = []

const requireSidebar = require.context(
	// The relative path of the components folder
	'@',
	// Whether or not to look in subfolders
	true,
	// The regular expression used to match base component filenames
	/modules(\\|\/)\w+(\\|\/)config(\\|\/)sidebar.js$/
)
	
requireSidebar.keys().forEach(fileName => {
	const componentConfig = requireSidebar(fileName)

	config = config.concat(componentConfig)
})

export default config
