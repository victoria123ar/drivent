import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { PaymentType } from '@/protocols';

export async function postCreatePayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as { userId: number };
  const payment = req.body as PaymentType;

  try {
    const paymentCreate = await paymentsService.postCreatePayments(userId, payment);

    return res.status(httpStatus.CREATED).send(paymentCreate);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as { userId: number };
  const { ticketId } = req.query as { ticketId: string | undefined };

  try {
    if (!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const payment = await paymentsService.getPayments(Number(ticketId), userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'BadRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
