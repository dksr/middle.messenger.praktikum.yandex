import Block from '../../../core/Block'
import template from './error.hbs'
import Link from '../../ui/Link'
import Router from '../../../utils/Router'

interface IErrorProps {
  title: string,
  description: string,
}

export default class Error extends Block<IErrorProps> {
  protected init() {
    this.children.homeLink = new Link({
      label: 'Назад к чатам',
      class: 'error-content__backlink',
      events: {
        click: () => Router.go('/messenger'),
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
