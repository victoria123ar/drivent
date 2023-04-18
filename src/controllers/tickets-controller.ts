import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function postCreateTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as { userId: number };
  const { ticketTypeId } = req.body as { ticketTypeId: number };

  try {
    const ticketType = await ticketsService.postCreateTickets(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(ticketType);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === 'BadRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as { userId: number };

  try {
    const ticket = await ticketsService.getTickets(userId);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketType = await ticketsService.getTicketsType();

    return res.status(httpStatus.OK).send(ticketType);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
