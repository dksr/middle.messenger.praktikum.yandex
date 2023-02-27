import Block from '../../../core/Block'
import template from './authForm.hbs'
import Field from '../../ui/Field'
import Button from '../../ui/Button'
import Link from '../../ui/Link'
import renderDOM from '../../../utils/renderDOM'
import { isValidForm, loginValidator, passwordValidator } from '../../../controllers/validators'

interface IAuthFormProps {
  events?: Record<string, (e: Event) => void>
}

export default class AuthForm extends Block {
  constructor(props: IAuthFormProps) {
    super(props)
  }

  init() {
    this.children = {
      LoginField: new Field({
        label: 'Логин',
        errorText: 'Логин от 3 до 20 символов, латиница, может содержать цифры, без спецсимволов и пробелов, кроме _ и -',
        hasError: false,
        id: 'login',
        name: 'login',
        type: 'text',
        events: {
          blur: (e: Event) => loginValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      PasswordField: new Field({
        label: 'Пароль',
        errorText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        hasError: false,
        id: 'password',
        name: 'password',
        type: 'password',
        events: {
          blur: (e: Event) => passwordValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: 'Войти',
        class: 'button-auth',
        type: 'submit',
      }),
      RegisterLink: new Link({
        label: 'Нет аккаунта?',
        class: 'button-register',
        events: {
          click: () => renderDOM('reg'),
        },
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
    return this.compile(template, this.props)
  }
}
