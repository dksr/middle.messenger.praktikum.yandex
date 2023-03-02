import Block from '../../../core/Block'
import template from './input.hbs'

interface IInputProps {
  id?: string,
  class?: string
  name?: string,
  type?: string,
  placeholder?: string,
  value?: string,
  events?: Record<string, (event: Event) => void>
}

export default class Input extends Block<IInputProps> {
  render() {
    return this.compile(template, this.props)
  }
}
