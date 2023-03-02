import Block from '../../../core/Block'
import template from './link.hbs'

interface ILinkProps {
  label: string,
  id?: string,
  class?: string,
  href?: string,
  events?: Record<string, (e?: Event) => void>
}

export default class Link extends Block<ILinkProps> {
  render() {
    return this.compile(template, this.props)
  }
}
