"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscriberController = void 0;
class CreateSubscriberController {
    constructor(createSubscribeUseCase) {
        this.createSubscribeUseCase = createSubscribeUseCase;
    }
    async handle(request, response) {
        const { name, gender, dateBirth, state, city, phone, whatsapp, email, accessibility, type, voluntaryOccupationArea, voluntaryNewArea, voluntaryOtherCheck, voluntaryOtherText, voluntaryReason, voluntaryAlreadyVoluntary, voluntaryPlace, voluntaryDisponibility, serviceOccupationArea, serviceNewArea, serviceOtherCheck, serviceOtherText, serviceWayOfWorking, serviceBillingWay, serviceSchooling, serviceTimeSegment, commercialOccupationArea, commercialOccupationArea2 } = request.body;
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
            });
            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.CreateSubscriberController = CreateSubscriberController;
