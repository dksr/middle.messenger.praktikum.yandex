import Block from '../../../core/Block'
import template from './chat.hbs'
import { withSelectedChat } from '../../../core/Store'
import { ChatInfo } from '../../../api/ChatsAPI'

interface IChatProps {
  id: number,
  avatar: string,
  title: string,
  last_message: {
    time: string,
    content: string,
  },
  dateTime: string,
  unread: number,
  selectedChat: ChatInfo,
  events: {
    click: () => void,
  }
}

class Chat extends Block<IChatProps> {
  render() {
    return this.compile(template, { ...this.props, isSelected: this.props.id === this.props.selectedChat?.id })
  }
}

export default withSelectedChat(Chat)
