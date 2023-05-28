import Block from '../../../core/Block'
import template from './fieldRow.hbs'
import Input from '../Input'

interface IFieldRowProps {
  label: string,
  name: string,
  type: string,
  hasError: boolean,
  value?: string,
  class?: string,
  errorText?: string,
  id?: string,
  placeholder?: string,
  events?: Record<string, any>
}

export default class FieldRow extends Block<IFieldRowProps> {
  init() {
    this.children = {
      Input: new Input(this.props),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
