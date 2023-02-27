import Block from '../../core/Block'
import template from './errorPage.hbs'
import Error from '../../components/business/Error'
import renderDOM from '../../utils/renderDOM'

function returnToHome(e: MouseEvent):void {
  if ((e.target as HTMLElement).tagName === 'A') {
    e.preventDefault()
    renderDOM('home')
  }
}

export default class ErrorPage extends Block {
  init() {
    this.children.error = new Error({
      title: '404',
      description: 'Страница не найдена',
      events: {
        click: returnToHome,
      },
    })
  }

  render() {
    return this.compile(template, {})
  }
}
