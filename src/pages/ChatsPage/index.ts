import template from './chatsPage.hbs'
import Block from '../../core/Block'
import ChatsSidebar from '../../components/business/ChatsSidebar'
import ChatsMain from '../../components/business/ChatsMain'

export default class ChatsPage extends Block {
  init() {
    this.children = {
      chatsSidebar: new ChatsSidebar({}),
      chatsMain: new ChatsMain({ showModalChatSettings: true }),
    }
  }

  render() {
    return this.compile(template, {})
  }
}
