create database eventodb;
use evetodb;

CREATE TABLE evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    local ENUM('auditório geral', 'laboratório de informática', 'mini auditório') NOT NULL,
    CONSTRAINT unique_date_location UNIQUE (data, local)
);

CREATE TABLE palestra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tema VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    palestrante_id INT,
    evento_id INT,
    FOREIGN KEY (palestrante_id) REFERENCES palestrante(id),
    FOREIGN KEY (evento_id) REFERENCES evento(id)
);

CREATE TABLE palestrante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    titulo ENUM('especialista', 'mestre', 'doutor') NOT NULL
);