import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import log from "../util/logger.js";
import QUERY from "../query/patient.query.js";

const httpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
};

export const getPatients = (req, res) => {
    log.info(`${req.method}, fetching patients`);
    database.query(QUERY.SELECT_PATIENTS, (error, results) => {
        if(!results) {
            res.status(httpStatus.OK.code).send(new Response(httpStatus.OK.code, httpStatus.OK.status, 'No patients found', ));
        } else {
            res.status(httpStatus.OK.code).send(new Response(httpStatus.OK.code, httpStatus.OK.status, 'Patients Retrieved', { patients: results } ));
        }
    });
};

export const createPatient = (req, res) => {
    log.info(`${req.method}, creating patient`);
    database.query(QUERY.CREATE_PATIENT, Object.values((req.query)), (error, results) => {
        if(!results) {
            log.error(error.message);
            res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, 'Error Occurred', ));
        } else {
            const patient = { id: results.id, ...req.query, created_at: new Date() }
            res.status(httpStatus.CREATED.code).send(new Response(httpStatus.CREATED.code, httpStatus.CREATED.status, 'Patient Created', { patient }, ));
        }
    });
};

export const getPatient = (req, res) => {
    log.info(`${req.method}, fetching patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
        res.status(httpStatus.NOT_FOUND.code)
        .send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found`));
    } else {
        res.status(httpStatus.OK.code)
        .send(new Response(httpStatus.OK.code, httpStatus.OK.status, `Patient retrieved`, results[0]));
    }
    });
};

/**
 * Updates a patient's information in the database.
 *
 * This function handles the HTTP request to update a patient's details. It first checks if the patient exists by querying the database. If found, it updates the patient's information; otherwise, it returns a 404 error. In case of any database errors during the update, a 500 error is returned.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {string} req.params.id - The ID of the patient to be updated.
 * @param {Object} req.query - The new patient data to be updated.
 * @param {Function} res.status - Sets the HTTP status code for the response.
 * @param {Function} res.send - Sends the response back to the client.
 * @returns {void}
 */
export const updatePatient = (req, res) => {
    log.info(`${req.method}, fetching patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
        if(!results[0]) {
            res.status(httpStatus.NOT_FOUND.code).send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, 'Patient Not Found', ));
        } else {
            log.info(`${req.method}, updating patient`);
            database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.query), req.params.id], (error, results) => {
                if(!error){
                    res.status(httpStatus.OK.code).send(new Response(httpStatus.OK.code, httpStatus.OK.status, 'Patient updated', { id: req.params.id, ...req.query }, ));
                } else {
                    log.error(error.message);
                    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(httpStatus.INTERNAL_SERVER_ERROR.code, httpStatus.INTERNAL_SERVER_ERROR.status, 'Error Occurred', ));
                }
            });
        }
    });
};

export const deletePatient = (req, res) => {
    log.info(`${req.method} ${req.originalurl}, deleting patient`);
    database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
        if(results.affectedRows > 0) {
            res.status(httpStatus.OK.code).send(new Response(httpStatus.OK.code, httpStatus.OK.status, 'Patient Deleted', results[0], ));
        } else {
            res.status(httpStatus.NOT_FOUND.code).send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, 'Patient Not Found', ));
        }
    });
};

export default httpStatus;
