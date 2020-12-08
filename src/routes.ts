import { Router } from 'express';
import { createSubscriberController } from './useCase/CreateSubscriber';

const router = Router()

router.post('/subscribers', (request, response) => {
    return createSubscriberController.handle(request, response)
})

export { router }