import Block from '../../core/Block'
import template from './regPage.hbs'
import RegForm from '../../components/RegForm'

export default class RegPage extends Block {
  init() {
    this.children.RegForm = new RegForm({})
  }

  render() {
    return this.compile(template, {})
  }
}
