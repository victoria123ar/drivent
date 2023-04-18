import ticketsRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, unauthorizedError } from '@/errors';

async function postCreateTickets(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.createTicket(ticketTypeId, enrollment.id);
  return ticket;
}

async function getTickets(userId: number) {
  const ticket = await ticketsRepository.findTicketById(userId);

  if (!ticket) {
    throw unauthorizedError();
  }

  return ticket;
}

async function getTicketsType() {
  const ticketType = await ticketsRepository.findTicketType();

  if (!ticketType) {
    throw notFoundError();
  }

  return ticketType;
}

const ticketsService = {
  postCreateTickets,
  getTickets,
  getTicketsType,
};

export default ticketsService;
