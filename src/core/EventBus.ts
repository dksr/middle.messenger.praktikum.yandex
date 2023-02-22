type Listener = (...args: unknown[]) => void

export default class EventBus {
  private readonly listeners: Record<string, Array<Listener>>

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      throw new Error(`Event ${event} не существует`)
    }
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback)
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Event ${event} не существует`)
    }
    this.listeners[event].forEach((callback) => {
      callback(...args)
    })
  }
}
