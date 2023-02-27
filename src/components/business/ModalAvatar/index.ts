import Block from '../../../core/Block'
import template from './modalAvatar.hbs'

export default class ModalAvatar extends Block {
  render() {
    return this.compile(template, {})
  }
}
