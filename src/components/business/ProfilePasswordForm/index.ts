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

export default class ProfilePasswordForm extends Block {
  init() {
    this.children = {
      OldPasswordField: new FieldRow({
        label: 'Старый пароль',
        name: 'old_password',
        hasError: false,
        errorText: 'Пароль неверный',
        type: 'password',
        class: 'field-value',
        value: '111111111bbbBBB',
        events: {
          blur: (e: Event) => oldPasswordValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      PasswordField: new FieldRow({
        label: 'Новый пароль',
        name: 'password',
        hasError: false,
        errorText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        type: 'password',
        class: 'field-value',
        value: '11111111aaaAAA',
        events: {
          blur: (e: Event) => passwordValidator.bind(this)(e.target as HTMLInputElement),
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
        value: '11111111aaaAAA',
        events: {
          blur: (e: Event) => passwordConfirmValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: 'Сохранить',
        class: 'profile-content__save-button',
      }),
    }

    this.setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          const data = isValidForm.bind(this)(e.target as HTMLFormElement)
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
    return this.compile(template, this.props)
  }
}
