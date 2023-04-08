import Block from '../../../core/Block'
import template from './chatsMain.hbs'
import btnSettings from '../../../../static/btn-setting.svg'
import Link from '../../ui/Link'
import ChatForm from '../Forms/ChatForm'
import store, {
  withSelectedChat,
  withShowModalAddChatUser,
  withShowModalChatSettings,
  withShowModalDeleteChatUser,
} from '../../../core/Store'
import { ChatInfo } from '../../../api/ChatsAPI'
import ChatMessages from '../ChatMessages'
import ModalChatSettings from '../Modals/ModalChatSettings'
import ModalAddChatUser from '../Modals/ModalAddChatUser'
import ModalDeleteChatUser from '../Modals/ModalDeleteChatUser'

interface IChatsMainProps {
  selectedChat?: ChatInfo,
  selectedChatUsers?: string,
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
      ModalAddChatUser: new ModalAddChatUser({}),
      ModalDeleteChatUser: new ModalDeleteChatUser({}),
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
export default withShowModalAddChatUser(withShowModalDeleteChatUser(withShowModalChatSettings(withSelectedChat(ChatsMain))))
