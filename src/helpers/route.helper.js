module.exports.resourceRoutes = (controller, exclusion = []) => {
  return [
    {
      type: 'index',
      path: '',
      callback: controller.index.bind(controller)
    },
    {
      type: 'read',
      path: ':id',
      callback: controller.read.bind(controller)
    },
    {
      type: 'store',
      path: '',
      method: 'post',
      callback: controller.store.bind(controller)
    },
    {
      type: 'update',
      path: ':id',
      method: 'put',
      callback: controller.update.bind(controller)
    },
    {
      type: 'update',
      name: 'update',
      path: ':id',
      method: 'patch',
      callback: controller.update.bind(controller)
    },
    {
      type: 'delete',
      path: ':id',
      method: 'delete',
      callback: controller.deletePermanently.bind(controller)
    },
  ].filter(item => !exclusion.includes(item.type))
}

module.exports.softDeleteRoutes = (controller, exclusion = []) => {
  return [
    {
      type: 'trashed',
      path: 'trashed',
      method: 'get',
      callback: controller.trashed.bind(controller)
    },
    {
      type: 'trash',
      path: ':id/trash',
      method: 'put',
      callback: controller.trash.bind(controller)
    },
    {
      type: 'restore',
      path: ':id/restore',
      method: 'put',
      callback: controller.restore.bind(controller)
    },
  ].filter(item => !exclusion.includes(item.type))
}

module.exports.crudRoutes = (controller, exclusion = []) => {
  return [
    {
      type: 'index',
      path: '',
      callback: controller.index.bind(controller)
    },
    {
      type: 'read',
      path: ':id',
      callback: controller.read.bind(controller)
    },
    {
      type: 'store',
      path: '',
      method: 'post',
      callback: controller.store.bind(controller)
    },
    {
      type: 'update',
      path: ':id',
      method: 'put',
      callback: controller.update.bind(controller)
    },
    {
      type: 'update',
      name: 'update',
      path: ':id',
      method: 'patch',
      callback: controller.update.bind(controller)
    },
    {
      type: 'delete',
      path: ':id',
      method: 'delete',
      callback: controller.deletePermanently.bind(controller)
    },
    {
      type: 'trashed',
      path: 'trashed',
      method: 'get',
      callback: controller.trashed.bind(controller)
    },
    {
      type: 'trash',
      path: ':id/trash',
      method: 'put',
      callback: controller.trash.bind(controller)
    },
    {
      type: 'restore',
      path: ':id/restore',
      method: 'put',
      callback: controller.restore.bind(controller)
    },
  ].filter(item => !exclusion.includes(item.type))
}