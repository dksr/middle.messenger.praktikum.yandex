import Block from '../../core/Block'
import template from './errorPage.hbs'
import Error from '../../components/Error'
import renderDOM from '../../utils/renderDOM'

export default class ErrorPage extends Block {
  init() {
    this.children.error = new Error({
      title: '404',
      description: 'Страница не найдена',
      events: {
        click: (e) => {
          if (e.target.tagName === 'A') {
            e.preventDefault()
            renderDOM('home')
          }
        },
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
