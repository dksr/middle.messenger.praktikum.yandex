import template from './chatsPage.hbs'
import Block from '../../core/Block'
import chatImg from '../../../static/chat-img.png'

export default class ChatsPage extends Block {
  render() {
    return this.compile(template, { ...this.props, chatImg })
  }
}
