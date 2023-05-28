import Block from '../../../core/Block'
import template from './chatsSidebar.hbs'
import Link from '../../ui/Link'
import Input from '../../ui/Input'
import ChatsList from '../ChatsList'
import Router from '../../../utils/Router'
import ChatsController from '../../../controllers/ChatsController'
import { Routes } from '../../../index'
import Button from '../../ui/Button'
import ModalAddChat from '../Modals/ModalAddChat'
import store, { withShowModalAddChat } from '../../../core/Store'

class ChatsSidebar extends Block {
  init() {
    // @ts-ignore
    // @ts-ignore
    this.children = {
      LinkProfile: new Link({
        label: 'Профиль',
        class: 'profile-link',
        events: {
          click: () => Router.go(Routes.Profile),
        },
      }),
      InputSearch: new Input({
        class: 'search-input',
        placeholder: 'Поиск',
        events: {
          keyup: (event: Event) => {
            const val = ((event.target as HTMLInputElement).value)
            store.set('searchChatQuery', val)
          },
        },
      }),
      AddChatButton: new Button({
        label: 'Добавить чат',
        class: 'add-chat',
        events: {
          click: () => store.set('showModalAddChat', true),
        },
      }),
      ModalAddChat: new ModalAddChat({}),
      // @ts-ignore
      ChatsList: new ChatsList({
        isLoaded: false,
      }),
    }
    ChatsController.fetchChats().finally(() => {
      (this.children.ChatsList as Block).setProps({
        isLoaded: true,
      })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default withShowModalAddChat(ChatsSidebar)
