import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import httpStatus from './controller/patient.controller.js';
import patientRoutes from './route/patient.route.js';
import log from './util/logger.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/patients', patientRoutes);
app.get('/', (req, res) => {res.send( new Response(httpStatus.OK.code, httpStatus.OK.status, 'Patient API, v1 - All systems Working') ) });
app.all('*', (req, res) => {res.status(httpStatus.NOT_FOUND.code).send( new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, 'Patient API, v1 - Route does not exist') ) });
app.listen(PORT, () => log.info(`Server running on port: ${PORT}`));
