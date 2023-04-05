import Block from '../../../core/Block'
import template from './authForm.hbs'
import Field from '../../ui/Field'
import Button from '../../ui/Button'
import Link from '../../ui/Link'
import { isValidForm, loginValidator, passwordValidator } from '../../../controllers/validators'
import Router from '../../../utils/Router'
import AuthController from '../../../controllers/AuthController'
import { SigninData } from '../../../api/AuthAPI'
import { Routes } from '../../../index'

interface IAuthFormProps {
  events?: Record<string, (e: Event) => void>
}

export default class AuthForm extends Block<IAuthFormProps> {
  init() {
    this.children = {
      LoginField: new Field({
        label: 'Логин',
        errorText: 'Логин от 3 до 20 символов, латиница, может содержать цифры, _ и -',
        hasError: false,
        id: 'login',
        name: 'login',
        type: 'text',
        events: {
          blur: (e: Event) => loginValidator.bind(this)(e.target as HTMLInputElement),
          focus: (e: Event) => loginValidator.bind(this)(e.target as HTMLInputElement),
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
          focus: (e: Event) => passwordValidator.bind(this)(e.target as HTMLInputElement),
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
          click: () => Router.go(Routes.Register),
        },
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
      AuthController.signin(data as unknown as SigninData)
    } else {
      console.error('Форма не валидна')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
