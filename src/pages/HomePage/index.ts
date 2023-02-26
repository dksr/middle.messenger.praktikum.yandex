import Block from '../../core/Block'
import template from './homePage.hbs'
import renderDOM, { ROUTES } from '../../utils/renderDOM'

function router(e: MouseEvent) {
  if ((e.target as HTMLElement).tagName === 'A') {
    e.preventDefault()
    let route = (e.target as HTMLLinkElement).getAttribute('href')
    if (route) {
      route = route.substring(1)
      renderDOM(route as keyof typeof ROUTES)
    }
  }
}

export default class HomePage extends Block {
  init() {
    this.props.events = {
      click: router,
    }
  }

  render() {
    return this.compile(template, {})
  }
}
