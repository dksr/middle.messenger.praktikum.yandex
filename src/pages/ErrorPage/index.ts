import Block from '../../core/Block'
import template from './errorPage.hbs'
import Error from '../../components/business/Error'

export default class ErrorPage extends Block {
  init() {
    this.children.error = new Error({
      title: '404',
      description: 'Страница не найдена',
    })
  }

  render() {
    return this.compile(template, {})
  }
}
