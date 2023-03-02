import Block from '../../../core/Block'
import template from './heading.hbs'

interface IHeadingProps {
  label: string,
  id?: string,
  class?: string
}

export default class Heading extends Block<IHeadingProps> {
  render() {
    return this.compile(template, this.props)
  }
}
