import Block from '../../../core/Block'
import template from './chatsSidebar.hbs'
import Link from '../../ui/Link'
import Input from '../../ui/Input'
import ChatsList from '../ChatsList'
import Router from '../../../utils/Router'
import ChatsController from '../../../controllers/ChatsController'
import { Routes } from '../../../index'

export default class ChatsSidebar extends Block {
  init() {
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
          keyup: (event: Event) => console.log((event.target as HTMLInputElement).value),
        },
      }),
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
    return this.compile(template, {})
  }
}
