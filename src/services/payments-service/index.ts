import paymentsRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { PaymentType } from '@/protocols';
import { notFoundError, unauthorizedError } from '@/errors';

async function postCreatePayments(userId: number, paymentData: PaymentType) {
  const ticket = await ticketsRepository.findTicketById(paymentData.ticketId);

  if (!ticket) {
    throw unauthorizedError();
  }

  const enrollment = await enrollmentRepository.findByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  if (userId !== enrollment.userId) {
    throw unauthorizedError();
  }

  await ticketsRepository.updateTicket(paymentData.ticketId);

  const payment = await paymentsRepository.createPayment(paymentData);

  return payment;
}

async function getPayments(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) {
    throw unauthorizedError();
  }

  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);

  if (userId !== enrollment.userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.findPayment();
  console.log(`retorno pagamentos: ${payment}`);

  return payment;
}

const paymentsService = {
  postCreatePayments,
  getPayments,
};

export default paymentsService;
