CREATE DATABASE registro_eventos;

USE registro_eventos;

CREATE TABLE palestrantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    titulo ENUM('Especialista', 'Mestre', 'Doutor', 'Outros') NOT NULL
);

CREATE TABLE palestras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tema VARCHAR(255) NOT NULL,
    data_horario DATETIME NOT NULL,
    palestrante_id INT,
    FOREIGN KEY (palestrante_id) REFERENCES palestrantes(id)
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    local ENUM('Auditório Geral', 'Laboratório de Informática', 'Mini Auditório', 'Outros') NOT NULL
);

CREATE TABLE eventos_palestras (
    evento_id INT,
    palestra_id INT,
    PRIMARY KEY (evento_id, palestra_id),
    FOREIGN KEY (evento_id) REFERENCES eventos(id),
    FOREIGN KEY (palestra_id) REFERENCES palestras(id)
);
