import template from './chatsPage.hbs'
import Block from '../../core/Block'
import ChatsSidebar from '../../components/business/ChatsSidebar'
import ChatsMain from '../../components/business/ChatsMain'

export default class ChatsPage extends Block {
  init() {
    this.children = {
      chatsSidebar: new ChatsSidebar({
        showChat: this.showChat.bind(this),
      }),
      chatsMain: new ChatsMain({
        showChat: false,
        showChatModal: false,
      }),
    }
  }

  showChat(show: boolean) {
    this.children.chatsMain.setProps({
      showChat: show,
    })
  }

  render() {
    return this.compile(template, {})
  }
}
