import joi from 'joi';
import { Payment } from '@/protocols';

export const createPaymentSchema = joi.object<Payment>({
  ticketId: joi.number().required(),
  cardData: joi
    .object({
      issuer: joi.string().required(),
      number: joi.number().required(),
      name: joi.string().required(),
      expirationDate: joi.string().required(),
      cvv: joi.number().required(),
    })
    .required(),
});
