import Block from '../../../core/Block'
import template from './error.hbs'

interface IErrorProps {
  title: string,
  description: string,
  events: {
    click: (e: any) => void
  }
}

export default class Error extends Block<IErrorProps> {
  render() {
    return this.compile(template, this.props)
  }
}
