import Block from '../../../core/Block'
import template from './chatsMain.hbs'
import btnSettings from '../../../../static/btn-setting.svg'
import Link from '../../ui/Link'
import ChatForm from '../Forms/ChatForm'
import store, { withSelectedChat, withShowModalChatSettings } from '../../../core/Store'
import { ChatInfo } from '../../../api/ChatsAPI'
import ChatMessages from '../ChatMessages'
import ModalChatSettings from '../Modals/ModalChatSettings'

interface IChatsMainProps {
  selectedChat?: ChatInfo,
  showModalChatSettings?: boolean,
}

class ChatsMain extends Block<IChatsMainProps> {
  init() {
    this.children = {
      LinkSettings: new Link({
        label: `<img src="${btnSettings}" alt="settings button">`,
        id: 'settings-button',
        events: {
          click: () => store.set('showModalChatSettings', true),
        },
      }),
      ModalChatSettings: new ModalChatSettings({}),
      ChatMessages: new ChatMessages({}),
      ChatForm: new ChatForm({}),
    }
  }

  render() {
    return this.compile(template, {
      ...this.props,
      btnSettings,
    })
  }
}

// @ts-ignore
export default withSelectedChat(withShowModalChatSettings(ChatsMain))
