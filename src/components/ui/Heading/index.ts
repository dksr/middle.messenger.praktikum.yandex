import Block from '../../../core/Block'
import template from './heading.hbs'

interface IHeadingProps {
  label: string,
  id?: string,
  class?: string
}

export default class Heading extends Block {
  constructor(props: IHeadingProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
