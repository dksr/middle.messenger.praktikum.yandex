import Block from '../../../core/Block'
import template from './chatsList.hbs'
import { withChats, withSearchChatQuery } from '../../../core/Store'
import { ChatInfo } from '../../../api/ChatsAPI'
import Chat from '../Chat'
import ChatsController from '../../../controllers/ChatsController'

interface IChatsListProps {
  isLoaded: boolean,
  chats: ChatInfo[],
  searchChatQuery?: string,
}

class ChatsList extends Block<IChatsListProps> {
  init() {
    // @ts-ignore
    this.children.chats = this.createChats(this.props)
  }

  componentDidUpdate(_oldProps: IChatsListProps, newProps: IChatsListProps) {
    // @ts-ignore
    this.children.chats = this.createChats(newProps)

    return true
  }

  private createChats(props: IChatsListProps) {
    // @ts-ignore
    let chats = props.chats.map((data) => new Chat({
      ...data,
      events: {
        click: () => {
          ChatsController.selectChat(data.id)
        },
      },
    }))
    const query = this.props.searchChatQuery
    if (query) {
      // @ts-ignore
      chats = chats.filter((chat) => chat.props.title.includes(query))
    }
    return chats
  }
  render() {
    return this.compile(template, { ...this.props })
  }
}

// @ts-ignore
export default withSearchChatQuery(withChats(ChatsList))
