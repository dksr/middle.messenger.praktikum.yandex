import Block from '../../../../core/Block'
import template from './deleteChatUserForm.hbs'
import { isValidForm, messageValidator } from '../../../../controllers/validators'
import Button from '../../../ui/Button'
import Field from '../../../ui/Field'
import ChatsController from '../../../../controllers/ChatsController'
import store from '../../../../core/Store'

interface IDeleteChatUserFormProps {
  events?: Record<string, (e: Event) => void>
}

export default class DeleteChatUserForm extends Block<IDeleteChatUserFormProps> {
  init() {
    this.children = {
      ChatUserNameField: new Field({
        label: 'Введите логин',
        errorText: 'Поле должно быть не пустое',
        hasError: false,
        name: 'chat_user_name',
        id: 'chat_user_name',
        type: 'text',
        events: {
          blur: (e: Event) => messageValidator.bind(this)(e.target as HTMLInputElement),
          focus: (e: Event) => messageValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: 'Удалить',
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

    if ((data as Record<string, string>).chat_user_name) {
      const chatId = store.getState().selectedChat
      const userLogin = (data as Record<string, string>).chat_user_name
      ChatsController.deleteUsersFromChat(chatId, userLogin)
    } else {
      console.error('Форма не валидна')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
