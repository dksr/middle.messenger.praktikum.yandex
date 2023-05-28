import Block from '../../../../core/Block'
import template from './addChatForm.hbs'
import { isValidForm, messageValidator } from '../../../../controllers/validators'
import Button from '../../../ui/Button'
import Field from '../../../ui/Field'
import ChatsController from '../../../../controllers/ChatsController'

interface IAddChatFormProps {
  events?: Record<string, (e: Event) => void>
}

export default class AddChatForm extends Block<IAddChatFormProps> {
  init() {
    this.children = {
      ChatNameField: new Field({
        label: 'Название чата',
        errorText: 'Должно быть не пустое',
        hasError: false,
        name: 'chat_name',
        id: 'chat_name',
        type: 'text',
        events: {
          blur: (e: Event) => messageValidator.bind(this)(e.target as HTMLInputElement),
          focus: (e: Event) => messageValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: 'Добавить',
        class: 'submit-button',
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
      ChatsController.create(data.chat_name)
    } else {
      console.error('Форма не валидна')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
