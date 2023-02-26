import Block from '../../core/Block'
import template from './authPage.hbs'
import AuthForm from '../../components/AuthForm'

export default class AuthPage extends Block {
  init() {
    this.children.AuthForm = new AuthForm({})
  }

  render() {
    return this.compile(template, {})
  }
}
