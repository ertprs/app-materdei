"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
const uuidv4_1 = require("uuidv4");
class Subscriber {
    constructor(props, id) {
        Object.assign(this, props);
        if (!id) {
            this.id = uuidv4_1.uuid();
        }
    }
}
exports.Subscriber = Subscriber;
