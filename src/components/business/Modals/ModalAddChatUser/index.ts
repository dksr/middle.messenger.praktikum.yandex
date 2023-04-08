import Block from '../../../../core/Block'
import template from './modalAddChatUser.hbs'
import Tag from '../../../ui/Tag'
import store from '../../../../core/Store'
import AddChatUserForm from '../../Forms/AddChatUserForm'

export default class ModalAddChatUser extends Block {
  init() {
    this.children = {
      Overlay: new Tag({
        tag: 'div',
        class: 'overlay',
        events: {
          click: () => {
            store.set('showModalAddChatUser', false)
          },
        },
      }),
      AddChatUserForm: new AddChatUserForm({}),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
