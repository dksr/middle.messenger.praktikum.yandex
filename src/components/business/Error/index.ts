import Block from '../../../core/Block'
import template from './error.hbs'

interface IError {
  title: string,
  description: string,
  events: {
    click: (e: any) => void
  }
}

export default class Error extends Block {
  constructor(props: IError) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
