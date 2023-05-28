import Block from '../../../../core/Block'
import template from './modalDeleteChatUser.hbs'
import Tag from '../../../ui/Tag'
import store from '../../../../core/Store'
import DeleteChatUserForm from '../../Forms/DeleteChatUserForm'

export default class ModalDeleteChatUser extends Block {
  init() {
    this.children = {
      Overlay: new Tag({
        tag: 'div',
        class: 'overlay',
        events: {
          click: () => {
            store.set('showModalDeleteChatUser', false)
          },
        },
      }),
      DeleteChatUserForm: new DeleteChatUserForm({}),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
