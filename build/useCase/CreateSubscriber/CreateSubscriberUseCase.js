"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscriberUseCase = void 0;
const Subscriber_1 = require("../../entities/Subscriber");
class CreateSubscriberUseCase {
    constructor(subscriberRepository, mailProvider) {
        this.subscriberRepository = subscriberRepository;
        this.mailProvider = mailProvider;
    }
    async execute(data) {
        const subscriberAlreadyExists = await this.subscriberRepository.findByEmailAndType(data.email, data.type);
        if (!subscriberAlreadyExists) {
            throw new Error('Subscriber already exists');
        }
        const subscriber = new Subscriber_1.Subscriber(data);
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
exports.CreateSubscriberUseCase = CreateSubscriberUseCase;
