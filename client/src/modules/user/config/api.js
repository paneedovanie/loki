export default {
  main: () => `/api/v1/users`,
  indi: id => `/api/v1/users/${id}`,
  trash: id => `/api/v1/users/${id}/trash`,
  trashed: () => `/api/v1/users/trashed`,
  restore: (id) => `/api/v1/users/${id}/restore`,
  delete: (id) => `/api/v1/users/${id}/delete`,
}