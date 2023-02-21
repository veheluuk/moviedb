CREATE DATABASE `moviedb` /*!40100 COLLATE 'utf8mb4_general_ci' */;

USE `moviedb`;

CREATE TABLE `Movies` (
	`Id` INT(11) NOT NULL AUTO_INCREMENT,
	`Name` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`Year` INT(4) UNSIGNED NULL DEFAULT NULL,
	`AgeLimit` INT(3) UNSIGNED NULL DEFAULT NULL,
	`Rating` INT(1) UNSIGNED NULL DEFAULT NULL,
	`Synopsis` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`Id`) USING BTREE
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

/*
CREATE TABLE generic (
  id TEXT,
  name TEXT,
  year INT,
  ageLimit INT,
  rating INT,
  synopsis TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE generic_genres (
  generic_id TEXT,
  id TEXT,
  value TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (generic_id) REFERENCES generic(id)
);

CREATE TABLE generic_actors (
  generic_id TEXT,
  id TEXT,
  firstName TEXT,
  lastName TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (generic_id) REFERENCES generic(id)
);

CREATE TABLE generic_director (
  generic_id TEXT,
  id TEXT,
  firstName TEXT,
  lastName TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (generic_id) REFERENCES generic(id)
);
*/

/*`EmailAddress` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
`Password` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
`Name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
`FirstName` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
`LastName` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
`Banned` BIT(1) NULL DEFAULT NULL*/

/*`IpAddress` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
`PlayerCount` INT(11) NULL DEFAULT NULL,
`MaxPlayerCount` INT(11) NULL DEFAULT NULL,
`Port` INT(11) NULL DEFAULT NULL,
`Date` DATETIME NULL DEFAULT NULL*/