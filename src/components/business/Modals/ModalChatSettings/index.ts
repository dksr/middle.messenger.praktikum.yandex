import Block from '../../../../core/Block'
import template from './modalChatSettings.hbs'
import Tag from '../../../ui/Tag'
import store from '../../../../core/Store'
import Link from '../../../ui/Link'
import chatsController from '../../../../controllers/ChatsController'

export default class ModalChatSettings extends Block {
  init() {
    this.children = {
      ChatModalOverlay: new Tag({
        tag: 'div',
        class: 'overlay',
        events: {
          click: () => store.set('showModalChatSettings', false),
        },
      }),
      AddUserLink: new Link({
        label: 'Добавить пользователя',
        events: {
          click: () => {
            store.set('showModalChatSettings', false)
            store.set('showModalAddChatUser', true)
          },
        },
      }),
      DeleteUserLink: new Link({
        label: 'Удалить пользователя',
        events: {
          click: () => {
            store.set('showModalChatSettings', false)
            store.set('showModalDeleteChatUser', true)
          },
        },
      }),
      DeleteChatLink: new Link({
        label: 'Удалить чат',
        class: 'delete-chat',
        events: {
          click: () => {
            // eslint-disable-next-line no-restricted-globals
            const confirmDelete = confirm('Вы точно хотите удалить данный чат? Историю переписки восстановить будет невозможно')
            if (!confirmDelete) {
              store.set('showModalChatSettings', false)
              return
            }

            const selectedChatId = store.getState().selectedChat
            if (!selectedChatId) {
              console.error('Нет выбранного чата')
            }
            try {
              chatsController.delete(selectedChatId)
            } catch (e) {
              console.error(e)
            }
            store.set('showModalChatSettings', false)
          },
        },
      }),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
