"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscriberController = void 0;
class CreateSubscriberController {
    constructor(createSubscribeUseCase) {
        this.createSubscribeUseCase = createSubscribeUseCase;
    }
    async handle(request, response) {
        const { name, gender, dateBirth, state, city, phone, whatsapp, email, accessibility, type, voluntaryOccupationArea, voluntaryNewArea, voluntaryOtherCheck, voluntaryOtherText, voluntaryReason, voluntaryAlreadyVoluntary, voluntaryPlace, voluntaryDisponibility, serviceOccupationArea, serviceNewArea, serviceOtherCheck, serviceOtherText, serviceWayOfWorking, serviceBillingWay, serviceSchooling, serviceTimeSegment, commercialOccupationArea, commercialOccupationArea2, commercialOtherCheck, commercialOtherText } = request.body;
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
                voluntaryOccupationArea: voluntaryOccupationArea || 0,
                voluntaryNewArea: voluntaryNewArea || "",
                voluntaryOtherCheck,
                voluntaryOtherText: voluntaryOtherText || "",
                voluntaryReason: voluntaryReason || 0,
                voluntaryAlreadyVoluntary,
                voluntaryPlace: voluntaryPlace || "",
                voluntaryDisponibility: voluntaryDisponibility || 0,
                serviceOccupationArea: serviceOccupationArea || 0,
                serviceNewArea: serviceNewArea || "",
                serviceOtherCheck,
                serviceOtherText: serviceOtherText || "",
                serviceWayOfWorking: serviceWayOfWorking || 0,
                serviceBillingWay: serviceBillingWay || 0,
                serviceSchooling: serviceSchooling || 0,
                serviceTimeSegment: serviceTimeSegment || 0,
                commercialOccupationArea: commercialOccupationArea || 0,
                commercialOccupationArea2: commercialOccupationArea2 || 0,
                commercialOtherCheck,
                commercialOtherText: commercialOtherText || ""
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
