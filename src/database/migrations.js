module.exports = {
  create_permissions_table: `
    CREATE TABLE
      permissions ( 
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255),
        code VARCHAR(255) NOT NULL UNIQUE,
        description VARCHAR(255),
        PRIMARY KEY (id)
      )`,
  create_roles_table: `
    CREATE TABLE
      roles ( 
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255),
        slug VARCHAR(255) UNIQUE,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        deleted_at TIMESTAMP NULL,
        PRIMARY KEY (id)
      )`,
  create_role_permissions_table: `
    CREATE TABLE
      role_permissions ( 
        id INT NOT NULL AUTO_INCREMENT,
        role_id int,
        permission_id int,
        created_at TIMESTAMP DEFAULT now(),
        PRIMARY KEY (id),
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
      )`,
  create_users_table: `
    CREATE TABLE
      users ( 
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        role_id INT NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        deleted_at TIMESTAMP NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (role_id) REFERENCES roles(id)
      )`,
  create_tokens_table: `
    CREATE TABLE
      tokens ( 
        id INT NOT NULL AUTO_INCREMENT,
        token VARCHAR(255),
        user_id INT NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT now(),
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
  add_provider_column_to_users_table: `
    ALTER TABLE users
    ADD provider VARCHAR(255) NULL DEFAULT NULL`,
  add_provider_id_column_to_users_table: `
    ALTER TABLE users
    ADD provider_id INT NULL DEFAULT NULL`,
  modify_provider_id_column_of_users_table: `
    ALTER TABLE users
    MODIFY COLUMN provider_id VARCHAR(255) NULL DEFAULT NULL`,
  modify_cred_column_of_users_table: `
    ALTER TABLE users
    MODIFY COLUMN username VARCHAR(255)  NULL DEFAULT NULL,
    MODIFY COLUMN password VARCHAR(255) NULL DEFAULT NULL`,
};
