"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} не существует`);
        }
        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }
    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} не существует`);
        }
        this.listeners[event].forEach((callback) => {
            callback(...args);
        });
    }
}
exports.default = EventBus;
//# sourceMappingURL=EventBus.js.map