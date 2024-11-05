/**
 * Contains SQL query strings for patient-related database operations.
 *
 * This object defines a set of SQL queries used for interacting with the patients table in the database. It includes queries for selecting multiple patients, selecting a single patient by ID, creating a new patient, updating an existing patient's information, and deleting a patient by ID.
 *
 * @constant {Object} QUERY - An object containing SQL query strings.
 * @property {string} QUERY.SELECT_PATIENTS - Query to select all patients, ordered by creation date, limited to 100 results.
 * @property {string} QUERY.SELECT_PATIENT - Query to select a patient by their ID.
 * @property {string} QUERY.CREATE_PATIENT - Query to insert a new patient into the database.
 * @property {string} QUERY.UPDATE_PATIENT - Query to update an existing patient's information by their ID.
 * @property {string} QUERY.DELETE_PATIENT - Query to delete a patient from the database by their ID.
 */
const QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created_at DESC LIMIT 100',
    SELECT_PATIENT: 'SELECT * FROM patients WHERE id = ?',
    CREATE_PATIENT: 'INSERT INTO patients(first_name, last_name, email, phone, address, diagnosis) VALUES (?, ?, ?, ?, ?, ?)',
    UPDATE_PATIENT: 'UPDATE patients SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, diagnosis = ? WHERE id = ?',
    DELETE_PATIENT: 'DELETE FROM patients WHERE id = ?'
};


export default QUERY;