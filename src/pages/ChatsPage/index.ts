import template from './chatsPage.hbs'
import Block from '../../core/Block'
import chatImg from '../../../static/chat-img.png'
import btnSettings from '../../../static/btn-setting.svg'
import readStatus from '../../../static/read-status.svg'
import messageImg from '../../../static/message-img.jpg'
import attachImg from '../../../static/attach.svg'
import btnMessageSubmit from '../../../static/btn-message-submit.svg'

export default class ChatsPage extends Block {
  render() {
    return this.compile(template, {
      chatImg, btnSettings, readStatus, messageImg, attachImg, btnMessageSubmit,
    })
  }
}
