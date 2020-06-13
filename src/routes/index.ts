import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ get: true }));

export default routes;
