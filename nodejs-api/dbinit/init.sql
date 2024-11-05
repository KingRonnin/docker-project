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