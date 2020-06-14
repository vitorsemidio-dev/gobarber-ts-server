import { Router } from 'express';

const appointments = Router();

appointments.post('/', (request, response) => response.json({ ok: true }));

export default appointments;
