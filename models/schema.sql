DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;


/* CREATE DATABASE stockup_db;
USE stockup_db;
CREATE TABLE shopping_list(
    id INT NOT NULL AUTO_INCREMENT,
    item VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    preferred_amount INT NOT NULL,
    current_amount INT NOT NULL,
    PRIMARY KEY (id)
) */

/* Select * FROM shopping_list;
INSERT INTO shopping_list(item, category, preferred_amount, current_amount)
VALUES ('Tooth Paste', 'Hygene', 2, 1), ('Cereal', 'Food', 1, 1), ('Bread', 'Food', 1,1) */