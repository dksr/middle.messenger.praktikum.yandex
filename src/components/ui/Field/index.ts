import Block from '../../../core/Block'
import template from './field.hbs'
import Input from '../Input'

interface IFieldProps {
  label: string,
  errorText: string,
  hasError: boolean,
  id: string,
  name: string,
  type: string,
  events?: Record<string, any>
}

export default class Field extends Block<IFieldProps> {
  init() {
    this.children.Input = new Input(this.props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
