import { prisma } from '@/config';

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: { ticketTypeId, status: 'RESERVED', enrollmentId },
    include: { TicketType: true },
  });
}

async function findTicketById(id: number) {
  return await prisma.ticket.findFirst({ where: { Enrollment: { userId: id } }, include: { TicketType: true } });
}

async function findTicketType() {
  return await prisma.ticketType.findMany();
}

async function updateTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'PAID' },
  });
}

const ticketsRepository = {
  createTicket,
  findTicketById,
  findTicketType,
  updateTicket,
};

export default ticketsRepository;
