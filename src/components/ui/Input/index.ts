import Block from '../../../core/Block'
import template from './input.hbs'

interface IInputProps {
  id: string,
  name: string,
  type: string,
}

export default class Input extends Block {
  constructor(props: IInputProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
