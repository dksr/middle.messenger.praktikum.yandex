import Block from '../../../core/Block'
import template from './fieldMessage.hbs'
import Input from '../Input'

interface IFieldMessageProps {
  id?: string,
  class?: string
  name?: string,
  type?: string,
  hasError?: boolean,
  placeholder?: string,
  value?: string,
  events?: Record<string, (event: Event) => void>
}

export default class FieldMessage extends Block {
  constructor(props: IFieldMessageProps) {
    super(props)
  }

  protected init() {
    this.children.Input = new Input(this.props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
