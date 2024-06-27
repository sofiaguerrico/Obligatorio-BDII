Create database PencaUCU;
USE PencaUCU;

CREATE TABLE Equipo (
    nombre_equipo VARCHAR(100) PRIMARY KEY,
    bandera VARCHAR(255)
);

CREATE TABLE Carrera(
    nombre_carrera VARCHAR(250) PRIMARY KEY
);

CREATE TABLE Administrador (
    CI INT UNIQUE,
    correo_admin VARCHAR(100) PRIMARY KEY,
    nombre_admin VARCHAR(100),
    apellido_admin VARCHAR(100),
    genero_admin VARCHAR(10),
    celular_admin INT,
    password_admin VARCHAR(100)
);

CREATE TABLE Alumno (
    CI INT UNIQUE,
    nombre_alumno VARCHAR(100),
    apellido_alumno VARCHAR(100),
    genero_alumno VARCHAR(10),
    celular_alumno INT,
    password_alumno VARCHAR(100),
    correo_estudiantil VARCHAR(100) PRIMARY KEY,
    campeon VARCHAR(100),
    subcampeon VARCHAR(100),
    puntos_totales INT,
    FOREIGN KEY (campeon) REFERENCES Equipo(nombre_equipo),
    FOREIGN KEY (subcampeon) REFERENCES Equipo(nombre_equipo)
);


CREATE TABLE Cursa(
    nombre_carrera VARCHAR(250),
    correo_estudiantil VARCHAR(100),
    PRIMARY KEY (nombre_carrera, correo_estudiantil),
    FOREIGN KEY (nombre_carrera) REFERENCES Carrera(nombre_carrera),
    FOREIGN KEY (correo_estudiantil) REFERENCES  Alumno(correo_estudiantil)
);

CREATE TABLE Estadio(
    ID_estadio INT,
    nombre_estadio VARCHAR(200),
    direccion_estadio VARCHAR(200),
    PRIMARY KEY(ID_estadio)
);

CREATE TABLE Juega_partido (
    equipo1 VARCHAR(100),
    equipo2 VARCHAR(100),
    fecha_hora_partido DATETIME,
    gol_equipo1 INT,
    gol_equipo2 INT,
    etapa VARCHAR(100),
    ID_estadio INT,
    PRIMARY KEY (equipo1, equipo2, fecha_hora_partido),
    FOREIGN KEY (equipo1) REFERENCES Equipo(nombre_equipo),
    FOREIGN KEY (equipo2) REFERENCES Equipo(nombre_equipo),
    FOREIGN KEY (ID_estadio) REFERENCES Estadio(ID_estadio)
);

INSERT INTO Administrador VALUES (1111111, "admin@correo.ucu", "admin", "admin", "Other", 99508039, "21232f297a57a5a743894a0e4a801fc3");

INSERT INTO Equipo (nombre_equipo, bandera) VALUES
('Argentina', ''),
('Bolivia', ''),
('Brasil', ''),
('Chile', ''),
('Colombia', ''),
('Ecuador', ''),
('Paraguay', ''),
('Perú', ''),
('Uruguay', ''),
('Venezuela', ''),
('United States', ''),
('México', ''),
('Canadá', ''),
('Costa Rica', ''),
('Jamaica', ''),
('Panamá', '');


INSERT INTO Carrera (nombre_carrera) VALUES ('Law');
INSERT INTO Carrera (nombre_carrera) VALUES ('Therapeutic Accompaniment');
INSERT INTO Carrera (nombre_carrera) VALUES ('Agronomy');
INSERT INTO Carrera (nombre_carrera) VALUES ('Information Systems Analyst');
INSERT INTO Carrera (nombre_carrera) VALUES ('Architecture');
INSERT INTO Carrera (nombre_carrera) VALUES ('Performing Arts');
INSERT INTO Carrera (nombre_carrera) VALUES ('Visual Arts');
INSERT INTO Carrera (nombre_carrera) VALUES ('Business Analytics');
INSERT INTO Carrera (nombre_carrera) VALUES ('Political Science');
INSERT INTO Carrera (nombre_carrera) VALUES ('Film');
INSERT INTO Carrera (nombre_carrera) VALUES ('Communication');
INSERT INTO Carrera (nombre_carrera) VALUES ('Communication and Marketing');
INSERT INTO Carrera (nombre_carrera) VALUES ('Public Accountant');
INSERT INTO Carrera (nombre_carrera) VALUES ('Data and Business');
INSERT INTO Carrera (nombre_carrera) VALUES ('Software Developer');
INSERT INTO Carrera (nombre_carrera) VALUES ('Business Management');
INSERT INTO Carrera (nombre_carrera) VALUES ('Economics');
INSERT INTO Carrera (nombre_carrera) VALUES ('Early Childhood Education');
INSERT INTO Carrera (nombre_carrera) VALUES ('Finance');
INSERT INTO Carrera (nombre_carrera) VALUES ('Physiotherapy');
INSERT INTO Carrera (nombre_carrera) VALUES ('Speech Therapy');
INSERT INTO Carrera (nombre_carrera) VALUES ('Human Resources Management');
INSERT INTO Carrera (nombre_carrera) VALUES ('Environmental Engineering');
INSERT INTO Carrera (nombre_carrera) VALUES ('Food Engineering');
INSERT INTO Carrera (nombre_carrera) VALUES ('Electronic Engineering');
INSERT INTO Carrera (nombre_carrera) VALUES ('Computer Engineering');
INSERT INTO Carrera (nombre_carrera) VALUES ('Industrial Engineering');
INSERT INTO Carrera (nombre_carrera) VALUES ('Artificial Intelligence and Data Science');
INSERT INTO Carrera (nombre_carrera) VALUES ('Nursing');
INSERT INTO Carrera (nombre_carrera) VALUES ('Computer Science');
INSERT INTO Carrera (nombre_carrera) VALUES ('Medicine');
INSERT INTO Carrera (nombre_carrera) VALUES ('International Business');
INSERT INTO Carrera (nombre_carrera) VALUES ('Business and Economics');
INSERT INTO Carrera (nombre_carrera) VALUES ('Notary Public');
INSERT INTO Carrera (nombre_carrera) VALUES ('Nutrition');
INSERT INTO Carrera (nombre_carrera) VALUES ('Dentistry');
INSERT INTO Carrera (nombre_carrera) VALUES ('Psychology');
INSERT INTO Carrera (nombre_carrera) VALUES ('Psychomotricity');
INSERT INTO Carrera (nombre_carrera) VALUES ('Educational Psychology');
INSERT INTO Carrera (nombre_carrera) VALUES ('Educational Recreation');
INSERT INTO Carrera (nombre_carrera) VALUES ('Sociology');
INSERT INTO Carrera (nombre_carrera) VALUES ('Social Work');


INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (1, 'Allegiant Stadium', 'Las Vegas, Nevada');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (2, 'AT&T Stadium', 'Arlington, Texas');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (3, 'Bank of America Stadium', 'Charlotte, North Carolina');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (4, 'Children’s Mercy Park', 'Kansas City, Kansas');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (5, 'Inter&Co Stadium', 'Orlando, Florida');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (6, 'GEHA Field at Arrowhead Stadium', 'Kansas City, Missouri');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (7, 'Hard Rock Stadium', 'Miami Gardens, Florida');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (8, 'Levi’s Stadium', 'Santa Clara, California');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (9, 'Mercedes-Benz Stadium', 'Atlanta, Georgia');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (10, 'MetLife Stadium', 'East Rutherford, New Jersey');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (11, 'NRG Stadium', 'Houston, Texas');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (12, 'Q2 Stadium', 'Austin, Texas');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (13, 'SoFi Stadium', 'Inglewood, California');
INSERT INTO Estadio (ID_estadio, nombre_estadio, direccion_estadio) VALUES (14, 'State Farm Stadium', 'Glendale, Arizona');