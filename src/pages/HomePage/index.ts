import Block from '../../core/Block'
import template from './homePage.hbs'

export default class HomePage extends Block {
  render() {
    return this.compile(template, this.props)
  }
}
