import { Subscriber } from '../../entities/Subscriber';
import { ISubscriberRepository } from '../ISubscriberRepository';

import { Sequelize, QueryTypes } from 'sequelize'

export class SequelizeSubscribersRepository implements ISubscriberRepository {
    private sequelize: Sequelize

    constructor() {
        try {
            this.sequelize = new Sequelize(`${process.env.MYSQL_DATABASE}`, `${process.env.MYSQL_USER}`, `${process.env.MYSQL_PASS}`, {
                host: `${process.env.MYSQL_HOST}`,
                dialect: 'mysql',
                define: {
                    timestamps: true,
                    underscored: true
                }
            })
        } catch(err) {
            throw new Error(`Unexpected error: ${err}`);
        }
    }

    async findByEmailAndType(email: string, type: number): Promise<any> {
        return await this.sequelize.query(
            'SELECT * FROM subscribers WHERE email = :email AND type = :type',
            {
                replacements: {
                    email: email,
                    type: type
                },
                type: QueryTypes.SELECT
            }
        )
    }

    async save(subscriber: Subscriber): Promise<void> {
        let dateBirth = (subscriber.dateBirth).split('-').reverse().join('-');

        await this.sequelize.query(
            'INSERT INTO subscribers (name,gender,date_birth,state,city,phone,whatsapp,email,accessibility,type,voluntary_occupation_area,voluntary_new_area,voluntary_other_check,voluntary_other_text,voluntary_reason,voluntary_already_voluntary,voluntary_place,voluntary_disponibility,service_occupation_area,service_new_Area,service_other_check,service_other_text,service_way_of_working,service_billing_way,service_schooling,service_time_segment,commercial_occupation_area,commercial_occupation_area2,commercial_other_check,commercial_other_text) ' +
            'VALUES (:name,:gender,:dateBirth,:state,:city,:phone,:whatsapp,:email,:accessibility,:type,:voluntaryOccupationArea,:voluntaryNewArea,:voluntaryOtherCheck,:voluntaryOtherText,:voluntaryReason,:voluntaryAlreadyVoluntary,:voluntaryPlace,:voluntaryDisponibility,:serviceOccupationArea,:serviceNewArea,:serviceOtherCheck,:serviceOtherText,:serviceWayOfWorking,:serviceBillingWay,:serviceSchooling,:serviceTimeSegment,:commercialOccupationArea,:commercialOccupationArea2,:commercialOtherCheck,:commercialOtherText)', 
            {
                replacements: {
                    name: subscriber.name,
                    gender: subscriber.gender,
                    dateBirth: dateBirth,
                    state: subscriber.state,
                    city: subscriber.city,
                    phone: subscriber.phone,
                    whatsapp: subscriber.whatsapp,
                    email: subscriber.email,
                    accessibility: subscriber.accessibility,
                    type: subscriber.type,
                    voluntaryOccupationArea: subscriber.voluntaryOccupationArea,
                    voluntaryNewArea: subscriber.voluntaryNewArea,
                    voluntaryOtherCheck: subscriber.voluntaryOtherCheck,
                    voluntaryOtherText: subscriber.voluntaryOtherText,
                    voluntaryReason: subscriber.voluntaryReason,
                    voluntaryAlreadyVoluntary: subscriber.voluntaryAlreadyVoluntary,
                    voluntaryPlace: subscriber.voluntaryPlace,
                    voluntaryDisponibility: subscriber.voluntaryDisponibility,
                    serviceOccupationArea: subscriber.serviceOccupationArea,
                    serviceNewArea: subscriber.serviceNewArea,
                    serviceOtherCheck: subscriber.serviceOtherCheck,
                    serviceOtherText: subscriber.serviceOtherText,
                    serviceWayOfWorking: subscriber.serviceWayOfWorking,
                    serviceBillingWay: subscriber.serviceBillingWay,
                    serviceSchooling: subscriber.serviceSchooling,
                    serviceTimeSegment: subscriber.serviceTimeSegment,
                    commercialOccupationArea: subscriber.commercialOccupationArea,
                    commercialOccupationArea2: subscriber.commercialOccupationArea2,
                    commercialOtherCheck: subscriber.commercialOtherCheck,
                    commercialOtherText: subscriber.commercialOtherText,
                },
                type: QueryTypes.SELECT
            }
        )
    }
}