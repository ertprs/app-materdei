import { Subscriber } from '../entities/Subscriber';

export interface ISubscriberRepository {
    findByEmailAndType(email: string, type: number): Promise<Subscriber>;
    save(subscriber: Subscriber): Promise<void>;
}