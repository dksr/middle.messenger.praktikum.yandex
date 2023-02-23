"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Home_1 = __importDefault(require("./pages/Home"));
window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');
    const homePage = new Home_1.default({ rootClass: 'nav-content' });
    root.append(homePage.getContent());
    homePage.dispatchComponentDidMount();
});
//# sourceMappingURL=index.js.map