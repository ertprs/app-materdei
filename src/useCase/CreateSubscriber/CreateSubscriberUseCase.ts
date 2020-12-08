import { Subscriber } from '../../entities/Subscriber';
import { IMailProvider } from '../../providers/IMailProvider';
import { ISubscriberRepository } from '../../repositories/ISubscriberRepository';
import { ICreateSubscriberRequestDTO } from './CreateSubscriberDTO';

export class CreateSubscriberUseCase {
    constructor(
        private subscriberRepository: ISubscriberRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateSubscriberRequestDTO) {
        const subscriberAlreadyExists = await this.subscriberRepository.findByEmailAndType(data.email, data.type);

        if (subscriberAlreadyExists.length > 0) {
            throw new Error('Subscriber already exists');
        }

        const subscriber = new Subscriber(data);

        await this.subscriberRepository.save(subscriber)
                .catch((err) => err);

        // await this.mailProvider.sendMail({
        //     to: {
        //         name: data.name,
        //         email: data.email
        //     },
        //     from: {
        //         name: 'Equipe Mater Dei',
        //         email: 'contato@materdeicam.org.br'
        //     },
        //     subject: 'Obrigado por se cadastrar!',
        //     body: '<p>Seu cadastro foi efetuado com sucesso.</p>'
        // });
    }
}