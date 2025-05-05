CREATE DATABASE backline;

GRANT ALL PRIVILEGES ON backline. * TO 'user'@'%';

USE backline;

CREATE TABLE guitars (
    id_guitar INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(50),
    year INT,
    `condition` VARCHAR(50),
    age INT,
    category VARCHAR(50)
);

INSERT INTO guitars (model, year, `condition`) VALUES 
    ('Gibson Les Paul', 1958, 'Good'),
    ('Fender Stratocaster', 1963, 'Bad'),
    ('Danelectro', 1992, 'Good');


