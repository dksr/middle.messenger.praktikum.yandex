"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const EventBus_1 = __importDefault(require("./EventBus"));
class Block {
    constructor(tagName = 'div', propsWithChildren = {}) {
        this.id = (0, nanoid_1.nanoid)(6);
        this._element = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        const eventBus = new EventBus_1.default();
        const { props, children } = this._getChildrenAndProps(propsWithChildren);
        this._meta = {
            tagName,
            props,
        };
        this.props = this._makePropsProxy(props);
        this.children = children;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    _getChildrenAndProps(childrenAndProps) {
        const props = {};
        const children = {};
        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            }
            else {
                props[key] = value;
            }
        });
        return { props, children };
    }
    _addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            var _a;
            (_a = this._element) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, events[eventName]);
        });
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
        if (this.props.rootClass) {
            this._addRootClass(this.props.rootClass, this._element);
        }
    }
    _addRootClass(classList, element) {
        if (typeof classList === 'string') {
            classList = new Array(classList);
        }
        element.classList.add(...classList);
    }
    _init() {
        this._createResources();
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    init() {
    }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount() {
    }
    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidUpdate(_oldProps, _newProps) {
        if (this.componentDidUpdate(_oldProps, _newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    componentDidUpdate(_oldProps, _newProps) {
        return true;
    }
    get element() {
        return this._element;
    }
    _render() {
        const fragment = this.render();
        this._element.innerHTML = '';
        this._element.append(fragment);
        this._addEvents();
    }
    compile(template, context) {
        const contextAndStubs = Object.assign({}, context);
        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });
        const html = template(contextAndStubs);
        const temp = document.createElement('template');
        temp.innerHTML = html;
        Object.entries(this.children).forEach(([_, component]) => {
            var _a;
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
            if (!stub) {
                return;
            }
            (_a = component.getContent()) === null || _a === void 0 ? void 0 : _a.append(...Array.from(stub.childNodes));
            stub.replaceWith(component.getContent());
        });
        return temp.content;
    }
    render() {
        return new DocumentFragment();
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, Object.assign({}, target), target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        this.getContent().style.display = 'block';
    }
    hide() {
        this.getContent().style.display = 'none';
    }
}
exports.default = Block;
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
};
//# sourceMappingURL=Block.js.map