import { MailtrapMailProvider } from '../../providers/Implementations/MailTrapMailProvider';
import { SequelizeSubscribersRepository } from '../../repositories/Implementations/SequelizeSubscribersRepository';
import { CreateSubscriberController } from './CreateSubscriberController';
import { CreateSubscriberUseCase } from './CreateSubscriberUseCase';

const mailTrapProvider = new MailtrapMailProvider()
const sequelizeSubscribersRepository = new SequelizeSubscribersRepository();

const createSubscriberUseCase = new CreateSubscriberUseCase(
    sequelizeSubscribersRepository,
    mailTrapProvider
)

const createSubscriberController = new CreateSubscriberController(
    createSubscriberUseCase
)

export { createSubscriberUseCase,  createSubscriberController }