CREATE DATABASE IF NOT EXISTS patientsdb;

USE patientsdb;

DROP TABLE IF EXISTS patients;

CREATE TABLE patients (
    id BIGINT primary key UNIQUE NOT NULL AUTO_INCREMENT,
    first_name varchar(255) default NULL,
    last_name varchar(255) default NULL,
    email varchar(255) default NULL,
    phone varchar(255) default NULL,
    address varchar(255) default NULL,
    diagnosis varchar(255) default NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT UQ_Patients_Email UNIQUE (email)
);

DELIMITER //
CREATE PROCEDURE create_and_return(IN first_name varchar(255), IN last_name varchar(255), IN email varchar(255), IN phone varchar(255), IN address varchar(255), IN diagnosis varchar(255))
BEGIN
    DECLARE patient_id INT;

    INSERT INTO patients(first_name, last_name, email, phone, address, diagnosis) 
    VALUES (first_name, last_name, email, phone, address, diagnosis);

    SET patient_id = LAST_INSERT_ID();

    SELECT * FROM patients WHERE id = patient_id;
END //
DELIMITER ;