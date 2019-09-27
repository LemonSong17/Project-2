CREATE DATABASE stockup_db;
USE stockup_db;
CREATE TABLE shopping_list(
    id INT NOT NULL AUTO_INCREMENT,
    item VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    preferred_amount INT NOT NULL,
    current_amount INT NOT NULL,
    PRIMARY KEY (id)
)