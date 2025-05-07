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

CREATE TABLE rentals (
    id_guitar_rental INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_guitar INT UNSIGNED(50),
    name VARCHAR(50),
    date DATE DEFAULT CURRENT_DATE,
    return_date DATE
);

INSERT INTO guitars (model, year, `condition`) VALUES 
    ('Gibson Les Paul', 1958, 'Good'),
    ('Fender Stratocaster', 1963, 'Bad'),
    ('Danelectro', 1992, 'Good');

INSERT INTO rentals (id_guitar, name, return_date) VALUES 
    ('1', 'Aritz Ontalvilla', '17-05-2025'),
    ('2', 'Ander Sevilla', '27-05-2025'),
    ('3', 'Alex Harillo', '30-05-2025');


