import { Subscriber } from '../../entities/Subscriber';
import { EnumGenders } from '../../enums/EnumGenders';
import { EnumOccupationArea as EnumVoluntaryOccupationArea } from '../../enums/voluntary/EnumOccupationArea';
import { EnumReason } from '../../enums/voluntary/EnumReason';
import { EnumDisponibility } from '../../enums/voluntary/EnumDisponibility';
import { EnumOccupationArea as EnumServiceOccupationArea } from '../../enums/service/EnumOccupationArea';
import { EnumOccupationArea as EnumCommercialOccupationArea } from '../../enums/commercial/EnumOccupationArea';
import { EnumOccupationArea2 as EnumCommercialOccupationArea2, EnumOccupationArea2 } from '../../enums/commercial/EnumOccupationArea2';
import { IMailProvider } from '../../providers/IMailProvider';
import { ISubscriberRepository } from '../../repositories/ISubscriberRepository';
import { ICreateSubscriberRequestDTO } from './CreateSubscriberDTO';
import { EnumWayOfWorking } from '../../enums/service/EnumWayOfWorking';
import { EnumBillingWay } from '../../enums/service/EnumBillingWay';
import { EnumSchooling } from '../../enums/service/EnumSchooling';
import { EnumTimeSegment } from '../../enums/service/EnumTimeSegment';
import { EnumTypes } from '../../enums/EnumTypes';

export class CreateSubscriberUseCase {
    private dataProcessed: ICreateSubscriberRequestDTO = null;

    constructor(
        private subscriberRepository: ISubscriberRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateSubscriberRequestDTO) {
        const subscriberAlreadyExists = await this.subscriberRepository.findByEmailAndType(data.email, data.type);

        this.dataProcessed = data;

        if (!subscriberAlreadyExists) {
            throw new Error('Subscriber already exists');
        }

        const subscriber = new Subscriber(data);

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

    private createEmailBody(type: number): string {
        let gender: string = EnumGenders[parseInt(this.dataProcessed.gender) - 1];

        let body = `<p><strong>${EnumTypes[this.dataProcessed.type - 1]}</strong><br /><br />
                       <strong>Nome:</strong> <span>${this.dataProcessed.name}</span><br />
                       <strong>Gênero:</strong> <span>${gender}</span><br />
                       <strong>Data de nascimento:</strong> <span>${this.dataProcessed.dateBirth}</span><br />
                       <strong>Estado:</strong> <span>${this.dataProcessed.state}</span><br />
                       <strong>Cidade:</strong> <span>${this.dataProcessed.city}</span><br />
                       <strong>Telefone:</strong> <span>${this.dataProcessed.phone}</span><br />
                       <strong>WhatsApp:</strong> <span>${this.dataProcessed.whatsapp ? 'Sim' : 'Não'}</span><br />
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

    private voluntaryType() {
        let occupationArea: string = EnumVoluntaryOccupationArea[this.dataProcessed.voluntaryOccupationArea - 1],
            voluntaryReason: string = EnumReason[this.dataProcessed.voluntaryReason - 1],
            disponibility: string = EnumDisponibility[this.dataProcessed.voluntaryDisponibility - 1];

        return `<strong>Área de atuação:</strong> <span>${occupationArea}</span><br />
            <strong>Área Indicada:</strong> <span>${this.dataProcessed.voluntaryNewArea}</span><br />
            <strong>Outro:</strong> <span>${this.dataProcessed.voluntaryOtherText}</span><br />
            <strong>Por que deseja atuar como voluntária(o):</strong> <span>${voluntaryReason}</span><br />
            <strong>Já trabalhou voluntariamente antes?</strong> <span>${this.dataProcessed.voluntaryAlreadyVoluntary ? 'Sim' : 'Não'}</span><br />
            <strong>Disponibilidade:</strong> <span>${disponibility}</span><br /></p>`;
    }

    private serviceType() {
        let occupationArea: string = EnumServiceOccupationArea[this.dataProcessed.serviceOccupationArea - 1],
            wayOfWorking: string = EnumWayOfWorking[this.dataProcessed.serviceWayOfWorking - 1],
            billingWay: string = EnumBillingWay[this.dataProcessed.serviceBillingWay - 1],
            schooling: string = EnumSchooling[this.dataProcessed.serviceSchooling - 1],
            timeSegment: string = EnumTimeSegment[this.dataProcessed.serviceTimeSegment - 1];

        return `<strong>Área de atuação:</strong> <span>${occupationArea}</span><br />
                <strong>Área Indicada:</strong> <span>${this.dataProcessed.serviceNewArea}</span><br />
                <strong>Outro:</strong> <span>${this.dataProcessed.serviceOtherText}</span><br />
                <strong>Forma de prestação/remuneração:</strong> <span>${wayOfWorking}</span><br />
                <strong>Forma de Faturamento:</strong> <span>${billingWay}</span><br />
                <strong>Escolaridade:</strong> <span>${schooling}</span><br />
                <strong>Tempo de atuação no segmento:</strong> <span>${timeSegment}</span><br /></p>`;
    }

    private commercialType() {
        let occupationArea: string = EnumCommercialOccupationArea[this.dataProcessed.commercialOccupationArea - 1],
            occupationArea2: string = EnumCommercialOccupationArea2[this.dataProcessed.commercialOccupationArea2 - 1];

        return `<strong>Área de atuação:</strong> <span>${occupationArea}</span><br />
                <strong>Área de atuação:</strong> <span>${occupationArea2}</span><br /></p>`;
    }
}