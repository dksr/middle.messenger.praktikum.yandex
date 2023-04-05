import Block from '../../../../core/Block'
import template from './modalAddChat.hbs'
import Tag from '../../../ui/Tag'
import store from '../../../../core/Store'
import AddChatForm from '../../Forms/AddChatForm'

export default class ModalAddChat extends Block {
  init() {
    this.children = {
      Overlay: new Tag({
        tag: 'div',
        class: 'overlay',
        events: {
          click: () => {
            store.set('showModalAddChat', false)
          },
        },
      }),
      AddChatForm: new AddChatForm({}),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
