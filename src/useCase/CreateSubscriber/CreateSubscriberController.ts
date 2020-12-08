import { Request, Response } from 'express';
import { CreateSubscriberUseCase } from './CreateSubscriberUseCase';

export class CreateSubscriberController {
    constructor(
        private createSubscribeUseCase: CreateSubscriberUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            gender,
            dateBirth,
            state,
            city,
            phone,
            whatsapp,
            email,
            accessibility,
            type,
            voluntaryOccupationArea,
            voluntaryNewArea,
            voluntaryOtherCheck,
            voluntaryOtherText,
            voluntaryReason,
            voluntaryAlreadyVoluntary,
            voluntaryPlace,
            voluntaryDisponibility,
            serviceOccupationArea,
            serviceNewArea,
            serviceOtherCheck,
            serviceOtherText,
            serviceWayOfWorking,
            serviceBillingWay,
            serviceSchooling,
            serviceTimeSegment,
            commercialOccupationArea,
            commercialOccupationArea2
        } = request.body;

        try {
            await this.createSubscribeUseCase.execute({
                name,
                gender,
                dateBirth,
                state,
                city,
                phone,
                whatsapp,
                email,
                accessibility,
                type,
                voluntaryOccupationArea,
                voluntaryNewArea,
                voluntaryOtherCheck,
                voluntaryOtherText,
                voluntaryReason,
                voluntaryAlreadyVoluntary,
                voluntaryPlace,
                voluntaryDisponibility,
                serviceOccupationArea,
                serviceNewArea,
                serviceOtherCheck,
                serviceOtherText,
                serviceWayOfWorking,
                serviceBillingWay,
                serviceSchooling,
                serviceTimeSegment,
                commercialOccupationArea,
                commercialOccupationArea2
            })

            return response.status(201).send()
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            })
        }
    }
}