import { invalidDataError } from '@/errors';
import { prisma } from '@/config';
import { PaymentType } from '@/protocols';

async function createPayment(data: PaymentType) {
  return await prisma.payment.create({ data });
}

async function findPayment() {
  return await prisma.payment.findMany();
}

const paymentsRepository = {
  createPayment,
  findPayment,
};

export default paymentsRepository;
