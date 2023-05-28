import Block from '../../../../core/Block'
import template from './chatForm.hbs'
import attachImg from '../../../../../static/attach.svg'
import btnMessageSubmit from '../../../../../static/btn-message-submit.svg'
import Button from '../../../ui/Button'
import FieldMessage from '../../../ui/FieldMessage'
import { isValidForm, messageValidator } from '../../../../controllers/validators'
import messagesController from '../../../../controllers/MessagesController'
import { withSelectedChat } from '../../../../core/Store'

class ChatForm extends Block {
  init() {
    this.children = {
      FieldMessage: new FieldMessage({
        name: 'message',
        type: 'text',
        class: 'message_input',
        hasError: false,
        placeholder: 'Сообщение',
        events: {
          blur: (event: Event) => messageValidator.bind(this)(event.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: `<img src="${btnMessageSubmit}" alt="Button message submit">`,
        type: 'submit',
      }),
    }
    this.setProps({
      events: {
        submit: this.onSubmit.bind(this),
      },
    })
  }

  onSubmit(e: Event) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = isValidForm.bind(this)(form)
    if (data) {
      const { message } = data;
      (((this.children.FieldMessage as Block).children.Input as Block)
        .getContent() as HTMLInputElement).value = ''
      messagesController.sendMessage(this.props.selectedChat.id, message)
    } else {
      console.error('Форма не валидна')
    }
  }

  render() {
    return this.compile(template, { ...this.props, attachImg })
  }
}

export default withSelectedChat(ChatForm)
