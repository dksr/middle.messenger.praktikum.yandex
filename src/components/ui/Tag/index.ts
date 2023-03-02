import Block from '../../../core/Block'
import template from './div.hbs'

interface ITagProps {
  tag: string,
  label?: string,
  id?: string,
  class?: string,
  events?: Record<string, (e?: Event) => void>
}

export default class Tag extends Block<ITagProps> {
  render() {
    return this.compile(template, this.props)
  }
}
