module.exports = {
  create_roles_table: `
    CREATE TABLE IF NOT EXISTS
      roles ( 
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        deleted_at TIMESTAMP NULL,
        PRIMARY KEY (id)
      )`,
  create_users_table: `
    CREATE TABLE IF NOT EXISTS
      users ( 
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        role_id INT NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        deleted_at TIMESTAMP NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (role_id) REFERENCES roles(id)
      )`,
}