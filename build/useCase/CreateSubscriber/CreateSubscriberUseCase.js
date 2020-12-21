"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscriberUseCase = void 0;
const Subscriber_1 = require("../../entities/Subscriber");
const EnumGenders_1 = require("../../enums/EnumGenders");
const EnumOccupationArea_1 = require("../../enums/voluntary/EnumOccupationArea");
const EnumReason_1 = require("../../enums/voluntary/EnumReason");
const EnumDisponibility_1 = require("../../enums/voluntary/EnumDisponibility");
const EnumOccupationArea_2 = require("../../enums/service/EnumOccupationArea");
const EnumOccupationArea_3 = require("../../enums/commercial/EnumOccupationArea");
const EnumOccupationArea2_1 = require("../../enums/commercial/EnumOccupationArea2");
const EnumWayOfWorking_1 = require("../../enums/service/EnumWayOfWorking");
const EnumBillingWay_1 = require("../../enums/service/EnumBillingWay");
const EnumSchooling_1 = require("../../enums/service/EnumSchooling");
const EnumTimeSegment_1 = require("../../enums/service/EnumTimeSegment");
const EnumTypes_1 = require("../../enums/EnumTypes");
class CreateSubscriberUseCase {
    constructor(subscriberRepository, mailProvider) {
        this.subscriberRepository = subscriberRepository;
        this.mailProvider = mailProvider;
        this.dataProcessed = null;
    }
    async execute(data) {
        const subscriberAlreadyExists = await this.subscriberRepository.findByEmailAndType(data.email, data.type);
        this.dataProcessed = data;
        if (!subscriberAlreadyExists) {
            throw new Error('Subscriber already exists');
        }
        const subscriber = new Subscriber_1.Subscriber(data);
        await this.subscriberRepository.save(subscriber)
            .catch((err) => err);
        await this.mailProvider.sendMail({
            to: {
                name: 'Equipe Mater Dei',
                email: 'contato@materdei.empresarial.ws'
            },
            from: {
                name: 'Equipe Mater Dei',
                email: 'contato@materdei.empresarial.ws'
            },
            replyTo: {
                name: data.name,
                email: data.email
            },
            subject: 'Nova inscrição no Faça Parte!',
            body: this.createEmailBody(data.type)
        });
    }
    createEmailBody(type) {
        let gender = EnumGenders_1.EnumGenders[parseInt(this.dataProcessed.gender) - 1];
        let body = `<p><strong>${EnumTypes_1.EnumTypes[this.dataProcessed.type - 1]}</strong><br /><br />
                       <strong>Nome:</strong> <span>${this.dataProcessed.name}</span><br />
                       <strong>Gênero:</strong> <span>${gender}</span><br />
                       <strong>Data de nascimento:</strong> <span>${this.dataProcessed.dateBirth}</span><br />
                       <strong>Estado:</strong> <span>${this.dataProcessed.state}</span><br />
                       <strong>Cidade:</strong> <span>${this.dataProcessed.city}</span><br />
                       <strong>Telefone:</strong> <span>${this.dataProcessed.phone}</span><br />
                       <strong>WhatsApp:</strong> <span>${this.dataProcessed.whatsapp ? 'Sim' : 'Não'}</span><br />
                       <strong>Email:</strong> <span>${this.dataProcessed.email}</span><br />
                       <strong>Necessidades especiais:</strong> <span>${this.dataProcessed.accessibility ? 'Sim' : 'Não'}</span><br />`;
        switch (type) {
            case 1:
                body += this.voluntaryType();
                break;
            case 2:
                body += this.serviceType();
                break;
            case 3:
                body += this.commercialType();
                break;
        }
        return body;
    }
    voluntaryType() {
        let occupationArea = EnumOccupationArea_1.EnumOccupationArea[this.dataProcessed.voluntaryOccupationArea - 1], voluntaryReason = EnumReason_1.EnumReason[this.dataProcessed.voluntaryReason - 1], disponibility = EnumDisponibility_1.EnumDisponibility[this.dataProcessed.voluntaryDisponibility - 1];
        return `<strong>Área de atuação:</strong> <span>${occupationArea}</span><br />
            <strong>Área Indicada:</strong> <span>${this.dataProcessed.voluntaryNewArea}</span><br />
            <strong>Outro:</strong> <span>${this.dataProcessed.voluntaryOtherText}</span><br />
            <strong>Por que deseja atuar como voluntária(o):</strong> <span>${voluntaryReason}</span><br />
            <strong>Já trabalhou voluntariamente antes?</strong> <span>${this.dataProcessed.voluntaryAlreadyVoluntary ? 'Sim' : 'Não'}</span><br />
            <strong>Disponibilidade:</strong> <span>${disponibility}</span><br /></p>`;
    }
    serviceType() {
        let occupationArea = EnumOccupationArea_2.EnumOccupationArea[this.dataProcessed.serviceOccupationArea - 1], wayOfWorking = EnumWayOfWorking_1.EnumWayOfWorking[this.dataProcessed.serviceWayOfWorking - 1], billingWay = EnumBillingWay_1.EnumBillingWay[this.dataProcessed.serviceBillingWay - 1], schooling = EnumSchooling_1.EnumSchooling[this.dataProcessed.serviceSchooling - 1], timeSegment = EnumTimeSegment_1.EnumTimeSegment[this.dataProcessed.serviceTimeSegment - 1];
        return `<strong>Área de atuação:</strong> <span>${occupationArea}</span><br />
                <strong>Área Indicada:</strong> <span>${this.dataProcessed.serviceNewArea}</span><br />
                <strong>Outro:</strong> <span>${this.dataProcessed.serviceOtherText}</span><br />
                <strong>Forma de prestação/remuneração:</strong> <span>${wayOfWorking}</span><br />
                <strong>Forma de Faturamento:</strong> <span>${billingWay}</span><br />
                <strong>Escolaridade:</strong> <span>${schooling}</span><br />
                <strong>Tempo de atuação no segmento:</strong> <span>${timeSegment}</span><br /></p>`;
    }
    commercialType() {
        let occupationArea = EnumOccupationArea_3.EnumOccupationArea[this.dataProcessed.commercialOccupationArea - 1], occupationArea2 = EnumOccupationArea2_1.EnumOccupationArea2[this.dataProcessed.commercialOccupationArea2 - 1];
        return `<strong>Área de atuação:</strong> <span>${occupationArea}</span><br />
                <strong>Outro:</strong> <span>${this.dataProcessed.commercialOtherText}</span><br />
                <strong>Informações complementares:</strong> <span>${occupationArea2}</span><br /></p>`;
    }
}
exports.CreateSubscriberUseCase = CreateSubscriberUseCase;
