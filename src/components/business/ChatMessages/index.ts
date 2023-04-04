import Block from '../../../core/Block'
import template from './chatMessages.hbs'
import { withSelectedChatMessages } from '../../../core/Store'
import ChatMessage from '../ChatMessage'
import { IMessage } from '../../../controllers/MessagesController'
import { formatDate } from '../../../utils/helpers'

interface IChatMessagesProps {
  selectedChat: number | undefined;
  messages: IMessage[];
  userId: number;
}

class ChatMessages extends Block<IChatMessagesProps> {
  init() {
    this.children.messages = this.createMessages(this.props)
  }

  protected componentDidUpdate(_oldProps: IChatMessagesProps, newProps: IChatMessagesProps): boolean {
    this.children.messages = this.createMessages(newProps)
    return true
  }

  private createMessages(props: IChatMessagesProps) {
    return props.messages.map((data) => new ChatMessage({ ...data, isMine: props.userId === data.user_id, time: formatDate(data.time) }))
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default withSelectedChatMessages(ChatMessages)
