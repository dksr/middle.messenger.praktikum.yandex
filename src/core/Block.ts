import { nanoid } from 'nanoid'
import EventBus from './EventBus'

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  public id = nanoid(6)
  protected props: any
  private readonly _meta: { tagName: string, props: any }
  private _element: HTMLElement | null = null
  public children: Record<string, Block>
  private eventBus: () => EventBus

  constructor(tagName = 'div', propsWithChildren: any = {}) {
    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this._meta = {
      tagName,
      props,
    }

    this.props = this._makePropsProxy(props)
    this.children = children

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {}
    const children: Record<string, Block> = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
    if (this.props.rootClass) {
      this._addRootClass(this.props.rootClass, this._element)
    }
  }

  private _addRootClass(classList: string | string[], element: HTMLElement) {
    if (typeof classList === 'string') {
      classList = new Array(classList)
    }
    element.classList.add(...classList)
  }

  private _init() {
    this._createResources()
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() {
  }

  private _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(_oldProps: any, _newProps: any) {
    if (this.componentDidUpdate(_oldProps, _newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(_oldProps: any, _newProps: any) {
    return true
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  private _render() {
    const fragment = this.render()
    this._element!.innerHTML = ''
    this._element!.append(fragment)
    this._addEvents()
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context }

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`
    })

    const html = template(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = html

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`)

      if (!stub) {
        return
      }

      component.getContent()?.append(...Array.from(stub.childNodes))

      stub.replaceWith(component.getContent()!)
    })

    return temp.content
  }

  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  getContent() {
    return this.element
  }

  private _makePropsProxy(props: any) {
    const self = this

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        target[prop] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  show() {
    this.getContent()!.style.display = 'block'
  }

  hide() {
    this.getContent()!.style.display = 'none'
  }
}
