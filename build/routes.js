"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateSubscriber_1 = require("./useCase/CreateSubscriber");
const router = express_1.Router();
exports.router = router;
router.post('/subscribers', (request, response) => {
    return CreateSubscriber_1.createSubscriberController.handle(request, response);
});
