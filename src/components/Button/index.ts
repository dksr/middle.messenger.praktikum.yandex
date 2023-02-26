import Block from '../../core/Block'
import template from './button.hbs'

interface IButtonProps {
  label: string,
  id?: string,
  class?: string,
  type?: string,
  events?: Record<string, (e?: Event) => void>
}

export default class Button extends Block {
  constructor(props: IButtonProps) {
    super(props)
  }
  render() {
    return this.compile(template, this.props)
  }
}
