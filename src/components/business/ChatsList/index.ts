import Block from '../../../core/Block'
import template from './chatsList.hbs'
import { withChats } from '../../../core/Store'
import { ChatInfo } from '../../../api/ChatsAPI'
import Chat from '../Chat'
import ChatsController from '../../../controllers/ChatsController'

interface IChatsListProps {
  isLoaded: boolean,
  chats: ChatInfo[],
}

class ChatsList extends Block<IChatsListProps> {
  init() {
    this.children.chats = this.createChats(this.props)
  }

  componentDidUpdate(_oldProps: IChatsListProps, newProps: IChatsListProps) {
    this.children.chats = this.createChats(newProps)

    return true
  }

  private createChats(props: IChatsListProps) {
    // @ts-ignore
    return props.chats.map((data) => new Chat({
      ...data,
      events: {
        click: () => {
          ChatsController.selectChat(data.id)
        },
      },
    }))
  }
  render() {
    return this.compile(template, { ...this.props })
  }
}

export default withChats(ChatsList)
