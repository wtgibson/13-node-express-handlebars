DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    burger_name VARCHAR(30),
    devoured BOOLEAN
);