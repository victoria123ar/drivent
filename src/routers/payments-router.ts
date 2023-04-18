import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayments, postCreatePayments } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPayments).post('/process', postCreatePayments);

export { paymentsRouter };
