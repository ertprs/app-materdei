import { uuid } from 'uuidv4'

export class Subscriber {
    public readonly id: string;

    public name: string;
    public gender: string;
    public dateBirth: string;
    public state: string;
    public city: string;
    public phone: string;
    public whatsapp: boolean;
    public email: string;
    public accessibility: boolean;
    public type: number;
    public voluntaryOccupationArea: number;
    public voluntaryNewArea: string;
    public voluntaryOtherCheck: boolean;
    public voluntaryOtherText: string;
    public voluntaryReason: number;
    public voluntaryAlreadyVoluntary: boolean;
    public voluntaryPlace: string;
    public voluntaryDisponibility: number;
    public serviceOccupationArea: number;
    public serviceNewArea: string;
    public serviceOtherCheck: boolean;
    public serviceOtherText: string;
    public serviceWayOfWorking: number;
    public serviceBillingWay: number;
    public serviceSchooling: number;
    public serviceTimeSegment: number;
    public commercialOccupationArea: number;
    public commercialOccupationArea2: number;

    constructor(props: Omit<Subscriber, 'id'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }
}