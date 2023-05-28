import Block from '../../../../core/Block'
import template from './modalAvatar.hbs'
import AvatarForm from '../../Forms/AvatarForm'
import Tag from '../../../ui/Tag'
import store from '../../../../core/Store'

export default class ModalAvatar extends Block {
  init() {
    this.children = {
      Overlay: new Tag({
        tag: 'div',
        class: 'overlay',
        events: {
          click: () => {
            store.set('profileShow.editProfileAvatarModal', false)
            console.log('overlay')
          },
        },
      }),
      avatarForm: new AvatarForm({}),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
