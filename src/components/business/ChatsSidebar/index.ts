import Block from '../../../core/Block'
import template from './chatsSidebar.hbs'
import Link from '../../ui/Link'
import Input from '../../ui/Input'
import ChatsList from '../ChatsList'
import renderDOM from '../../../utils/renderDOM'
import chatImg from '../../../../static/chat-img.png'

export default class ChatsSidebar extends Block {
  init() {
    this.children = {
      LinkProfile: new Link({
        label: 'Профиль',
        class: 'profile-link',
        events: {
          click: () => renderDOM('profile'),
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
        chats: [
          {
            title: 'Андрей',
            text: 'Изображение',
            dateTime: '10:49',
            unread: 2,
            img: chatImg,
          },
          {
            title: 'Киноклуб',
            text: '<b>Вы:</b> стикер',
            dateTime: '12:00',
            unread: 0,
            img: chatImg,
          },
          {
            title: 'Илья',
            text: 'Друзья, у меня для вас особенный выпуск новостей!...',
            dateTime: '15:12',
            unread: 4,
            img: chatImg,
          },
          {
            title: 'Андрей',
            text: 'Изображение',
            dateTime: '10:49',
            unread: 2,
            img: chatImg,
          },
          {
            title: 'Киноклуб',
            text: '<b>Вы:</b> стикер',
            dateTime: '12:00',
            unread: 0,
            img: chatImg,
          },
          {
            title: 'Илья',
            text: 'Друзья, у меня для вас особенный выпуск новостей!...',
            dateTime: '15:12',
            unread: 4,
            img: chatImg,
          },
          {
            title: 'Андрей',
            text: 'Изображение',
            dateTime: '10:49',
            unread: 2,
            img: chatImg,
          },
          {
            title: 'Киноклуб',
            text: '<b>Вы:</b> стикер',
            dateTime: '12:00',
            unread: 0,
            img: chatImg,
          },
          {
            title: 'Илья',
            text: 'Друзья, у меня для вас особенный выпуск новостей!...',
            dateTime: '15:12',
            unread: 4,
            img: chatImg,
          },
          {
            title: 'Андрей',
            text: 'Изображение',
            dateTime: '10:49',
            unread: 2,
            img: chatImg,
          },
          {
            title: 'Киноклуб',
            text: '<b>Вы:</b> стикер',
            dateTime: '12:00',
            unread: 0,
            img: chatImg,
          },
          {
            title: 'Илья',
            text: 'Друзья, у меня для вас особенный выпуск новостей!...',
            dateTime: '15:12',
            unread: 4,
            img: chatImg,
          },
        ],
        events: {
          click: () => {
            this.props.showChat(true)
          },
        },
      }),
    }
  }

  render() {
    return this.compile(template, {})
  }
}
