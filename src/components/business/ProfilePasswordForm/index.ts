import Block from '../../../core/Block'
import template from './profilePasswordForm.hbs'
import {
  isValidForm,
  oldPasswordValidator,
  passwordConfirmValidator,
  passwordValidator,
} from '../../../controllers/validators'
import Button from '../../ui/Button'
import FieldRow from '../../ui/FieldRow'
import UsersController from '../../../controllers/UsersController'

export default class ProfilePasswordForm extends Block {
  init() {
    this.children = {
      OldPasswordField: new FieldRow({
        label: 'Старый пароль',
        name: 'oldPassword',
        hasError: false,
        errorText: 'Пароль неверный',
        type: 'password',
        class: 'field-value',
        placeholder: 'Введите старый пароль',
        events: {
          blur: (e: Event) => oldPasswordValidator.bind(this)(e.target as HTMLInputElement),
          focus: (e: Event) => oldPasswordValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      PasswordField: new FieldRow({
        label: 'Новый пароль',
        name: 'newPassword',
        hasError: false,
        errorText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        type: 'password',
        class: 'field-value',
        placeholder: 'Введите новый пароль',
        events: {
          blur: (e: Event) => passwordValidator.bind(this)(e.target as HTMLInputElement),
          focus: (e: Event) => passwordValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      PasswordConfirmField: new FieldRow({
        label: 'Повторите новый пароль',
        hasError: false,
        errorText: 'Пароли не совпадают',
        id: 'password_confirm',
        name: 'password_confirm',
        type: 'password',
        class: 'field-value',
        placeholder: 'Повторите новый пароль',
        events: {
          blur: (e: Event) => passwordConfirmValidator.bind(this)(e.target as HTMLInputElement),
          focus: (e: Event) => passwordConfirmValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: 'Сохранить',
        class: 'profile-content__save-button',
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
      UsersController.updateUserPassword(data)
    } else {
      console.log('Форма не валидна')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
