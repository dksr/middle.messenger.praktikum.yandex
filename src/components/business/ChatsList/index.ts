import Block from '../../../core/Block'
import template from './chatsList.hbs'
import chatImg from '../../../../static/chat-img.png'

export default class ChatsList extends Block {
  render() {
    return this.compile(template, { ...this.props, chatImg })
  }
}
