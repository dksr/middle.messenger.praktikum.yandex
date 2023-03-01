import Block from '../../../core/Block'
import template from './chatsMain.hbs'
import chatImg from '../../../../static/chat-img.png'
import btnSettings from '../../../../static/btn-setting.svg'
import readStatus from '../../../../static/read-status.svg'
import messageImg from '../../../../static/message-img.jpg'
import Link from '../../ui/Link'
import Tag from '../../ui/Tag'
import ChatForm from '../ChatForm'

interface IChatsMainProps {
  showChat: boolean
}

export default class ChatsMain extends Block {
  constructor(props: IChatsMainProps) {
    super(props)
  }

  protected init() {
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
      ChatForm: new ChatForm({}),
    }
  }

  render() {
    return this.compile(template, {
      ...this.props,
      chatImg,
      btnSettings,
      readStatus,
      messageImg,
    })
  }
}
