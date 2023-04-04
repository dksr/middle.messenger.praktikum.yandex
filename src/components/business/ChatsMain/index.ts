import Block from '../../../core/Block'
import template from './chatsMain.hbs'
import chatImg from '../../../../static/chat-img.png'
import btnSettings from '../../../../static/btn-setting.svg'
import Link from '../../ui/Link'
import Tag from '../../ui/Tag'
import ChatForm from '../ChatForm'
import { withSelectedChat } from '../../../core/Store'
import { ChatInfo } from '../../../api/ChatsAPI'
import ChatMessages from '../ChatMessages'

interface IChatsMainProps {
  selectedChat: ChatInfo,
  showChatModal?: boolean,
}

class ChatsMain extends Block<IChatsMainProps> {
  init() {
    this.children = {
      LinkSettings: new Link({
        label: `<img src="${btnSettings}" alt="settings button">`,
        id: 'settings-button',
        events: {
          click: () => this.setProps({ showChatModal: true }),
        },
      }),
      ChatModalOverlay: new Tag({
        tag: 'div',
        class: 'overlay',
        events: {
          click: () => this.setProps({ showChatModal: false }),
        },
      }),
      ChatMessages: new ChatMessages({}),
      ChatForm: new ChatForm({}),
    }
  }

  render() {
    return this.compile(template, {
      ...this.props,
      chatImg,
      btnSettings,
    })
  }
}

export default withSelectedChat(ChatsMain)
