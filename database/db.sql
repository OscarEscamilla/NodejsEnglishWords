CREATE DATABASE app_links;

use app_links;


-- user table --
CREATE TABLE IF NOT EXISTS users(
    id INT(11) NOT NULL AUTO_INCREMENT,,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);


-- links table --
CREATE TABLE IF NOT EXISTS links(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    id_user int(11) NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_user FOREIGN KEY(id_user) REFERENCES user (id)
);