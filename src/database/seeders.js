const
  pluralize = require('pluralize'),
  resourcePermissions = (name) => {
    return `( 'View ${pluralize(name)}', '${pluralize(name)}.index', 'To be able to view all ${pluralize(name)}' ),
      ( 'View ${name}', '${pluralize(name)}.show', 'To be able to view a ${name}' ),
      ( 'Create ${name}', '${pluralize(name)}.store', 'To be able to store a ${name}' ),
      ( 'Update ${name}', '${pluralize(name)}.update', 'To be able to update a ${name}' ),
      ( 'Delete ${name}', '${pluralize(name)}.delete', 'To be able to delete a ${name}' ),
      ( 'View trashed ${pluralize(name)}', '${pluralize(name)}.trashed', 'To be able to view trashed ${pluralize(name)}' ),
      ( 'Trash ${name}', '${pluralize(name)}.trash', 'To be able to trash a ${name}' ),
      ( 'Restore ${name}', '${pluralize(name)}.restore', 'To be able to restore a ${name}' )
  `
  }

module.exports = {
  seed_permissions_table: `
    INSERT INTO
      permissions
      ( title, code, description )
    VALUES` +
    // # Roles permissions
    resourcePermissions('role') +

    // # Users permissions
    "," + resourcePermissions('user'),

  seed_roles_table: `
    INSERT INTO
      roles
      ( title, slug, description )
    VALUES
      ( 'Superadmin', 'superadmin', 'Manage the whole system' ),
      ( 'User', 'user', 'The target user of the system' )
    `,

  seed_role_permissions_table: `
    INSERT INTO
      role_permissions ( role_id, permission_id )
      SELECT
        (
          SELECT 
            id
          FROM
            roles
          WHERE
            slug = 'superadmin'
        ), id
      FROM
        permissions
    `
}