const { auth } = require(`../core/middlewares/base.middlerware`)

module.exports.resourceRoutes = (controller, suffix = "", exclusion = []) => {
  return [
    {
      type: 'index',
      path: '',
      middlewares: auth(`${suffix}.index`),
      callback: controller.index.bind(controller)
    },
    {
      type: 'read',
      path: ':id',
      middlewares: auth(`${suffix}.read`),
      callback: controller.read.bind(controller)
    },
    {
      type: 'store',
      path: '',
      method: 'post',
      middlewares: auth(`${suffix}.store`),
      callback: controller.store.bind(controller)
    },
    {
      type: 'update',
      path: ':id',
      method: 'put',
      middlewares: auth(`${suffix}.update`),
      callback: controller.update.bind(controller)
    },
    {
      type: 'update',
      path: ':id',
      method: 'patch',
      middlewares: auth(`${suffix}.update`),
      callback: controller.update.bind(controller)
    },
    {
      type: 'delete',
      path: ':id',
      method: 'delete',
      middlewares: auth(`${suffix}.delete`),
      callback: controller.deletePermanently.bind(controller)
    },
  ].filter(item => !exclusion.includes(item.type))
}

module.exports.softDeleteRoutes = (controller, suffix = "", exclusion = []) => {
  return [
    {
      type: 'trashed',
      path: 'trashed',
      method: 'get',
      middlewares: auth(`${suffix}.trashed`),
      callback: controller.trashed.bind(controller)
    },
    {
      type: 'trash',
      path: ':id/trash',
      method: 'put',
      middlewares: auth(`${suffix}.trash`),
      callback: controller.trash.bind(controller)
    },
    {
      type: 'restore',
      path: ':id/restore',
      method: 'put',
      middlewares: auth(`${suffix}.restore`),
      callback: controller.restore.bind(controller)
    },
  ].filter(item => !exclusion.includes(item.type))
}

module.exports.crudRoutes = (controller, suffix = "", exclusion = []) => {
  return [
    {
      type: 'index',
      path: '',
      middlewares: auth(`${suffix}.index`),
      callback: controller.index.bind(controller)
    },
    {
      type: 'read',
      path: ':id',
      middlewares: auth(`${suffix}.read`),
      callback: controller.read.bind(controller)
    },
    {
      type: 'store',
      path: '',
      method: 'post',
      middlewares: auth(`${suffix}.store`),
      callback: controller.store.bind(controller)
    },
    {
      type: 'update',
      path: ':id',
      method: 'put',
      middlewares: auth(`${suffix}.update`),
      callback: controller.update.bind(controller)
    },
    {
      type: 'update',
      path: ':id',
      method: 'patch',
      middlewares: auth(`${suffix}.update`),
      callback: controller.update.bind(controller)
    },
    {
      type: 'delete',
      path: ':id',
      method: 'delete',
      middlewares: auth(`${suffix}.delete`),
      callback: controller.deletePermanently.bind(controller)
    },
    {
      type: 'trashed',
      path: 'trashed',
      method: 'get',
      middlewares: auth(`${suffix}.trashed`),
      callback: controller.trashed.bind(controller)
    },
    {
      type: 'trash',
      path: ':id/trash',
      method: 'put',
      middlewares: auth(`${suffix}.trash`),
      callback: controller.trash.bind(controller)
    },
    {
      type: 'restore',
      path: ':id/restore',
      method: 'put',
      middlewares: auth(`${suffix}.restore`),
      callback: controller.restore.bind(controller)
    },
  ].filter(item => !exclusion.includes(item.type))
}