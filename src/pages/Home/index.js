"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_hbs_1 = __importDefault(require("./home.hbs"));
const Block_1 = __importDefault(require("../../core/Block"));
class HomePage extends Block_1.default {
    constructor(props) {
        super('div', props);
    }
    render() {
        return this.compile(home_hbs_1.default, this.props);
    }
}
exports.default = HomePage;
//# sourceMappingURL=index.js.map