import Block from '../../../core/Block'
import template from './modalAvatar.hbs'
import AvatarForm from '../AvatarForm'

export default class ModalAvatar extends Block {
  init() {
    this.children.avatarForm = new AvatarForm({})
  }

  render() {
    return this.compile(template, this.props)
  }
}
