import Block from '../../../core/Block'
import template from './chatForm.hbs'
import attachImg from '../../../../static/attach.svg'
import btnMessageSubmit from '../../../../static/btn-message-submit.svg'
import Button from '../../ui/Button'
import FieldMessage from '../../ui/FieldMessage'
import { isValidForm, messageValidator } from '../../../controllers/validators'

export default class ChatForm extends Block {
  init() {
    this.children = {
      MessageField: new FieldMessage({
        name: 'message',
        type: 'text',
        class: 'message_input',
        hasError: false,
        placeholder: 'Сообщение',
        events: {
          blur: (e) => messageValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: `<img src="${btnMessageSubmit}" alt="Button message submit">`,
        type: 'submit',
      }),
    }
    this.setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          const form = e.target as HTMLFormElement
          const data = isValidForm.bind(this)(form)
          if (data) {
            console.log(data)
          } else {
            console.log('Форма не валидна')
          }
        },
      },
    })
  }

  render() {
    return this.compile(template, { ...this.props, attachImg })
  }
}
