const requireContext = require('node-require-context')

module.exports = function (app) {
  const files = requireContext(`../`, true, /(routes)\/\w+\.route\.js/)

  files.keys().forEach(file => {
    const contents = files(file)
    if (!Array.isArray(contents.routes)) return
    for (const content of contents.routes)
      registerChildren(app, contents.suffix || '', content)
  })

  // console.log(app._router.stack)
}

function registerChildren(app, suffix = '', router) {
  if (!router.children) return
  router.children.forEach(route => {
    const routeName = suffix + router.path
    if (route.children)
      return registerChildren(app, `${routeName}/`, route)
    app[route.method || 'get'](`${routeName}/${route.path}`, route.middlewares || [], route.callback)
  })
}