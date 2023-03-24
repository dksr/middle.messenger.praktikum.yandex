import Block from '../../../core/Block'
import template from './regForm.hbs'
import Field from '../../ui/Field'
import Button from '../../ui/Button'
import Link from '../../ui/Link'
import {
  emailValidator, firstNameValidator, secondNameValidator, isValidForm,
  loginValidator, phoneValidator, passwordValidator, passwordConfirmValidator,
} from '../../../controllers/validators'
import Router from '../../../utils/Router'
import AuthController from '../../../controllers/AuthController'
import { SignupData } from '../../../api/AuthAPI'
import { Routes } from '../../../index'

export default class RegForm extends Block {
  init() {
    this.children = {
      EmailField: new Field({
        label: 'Почта',
        errorText: 'Неверный e-mail',
        hasError: false,
        id: 'email',
        name: 'email',
        type: 'text',
        events: {
          blur: (e: Event) => emailValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      LoginField: new Field({
        label: 'Логин',
        errorText: 'Логин от 3 до 20 символов, латиница, может содержать цифры, _ и -',
        hasError: false,
        id: 'login',
        name: 'login',
        type: 'text',
        events: {
          blur: (e: Event) => loginValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      FirstNameField: new Field({
        label: 'Имя',
        errorText: 'Имя должно начинаться с большой буквы, без пробелов, цифр и спецсимволов',
        hasError: false,
        id: 'first_name',
        name: 'first_name',
        type: 'text',
        events: {
          blur: (e: Event) => firstNameValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SecondNameField: new Field({
        label: 'Фамилия',
        errorText: 'Фамилия должна начинаться с большой буквы, без пробелов, цифр и спецсимволов',
        hasError: false,
        id: 'second_name',
        name: 'second_name',
        type: 'text',
        events: {
          blur: (e: Event) => secondNameValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      PhoneField: new Field({
        label: 'Телефон',
        errorText: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
        hasError: false,
        id: 'phone',
        name: 'phone',
        type: 'text',
        events: {
          blur: (e: Event) => phoneValidator.bind(this)(e.target as HTMLInputElement),
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
      PasswordConfirmField: new Field({
        label: 'Пароль (ещё раз)',
        errorText: 'Пароли не совпадают',
        hasError: false,
        id: 'password_confirm',
        name: 'password_confirm',
        type: 'password',
        events: {
          blur: (e: Event) => passwordConfirmValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: 'Зарегистрироваться',
        class: 'button-auth',
        type: 'submit',
      }),
      AuthLink: new Link({
        label: 'Войти',
        class: 'button-register',
        events: {
          click: () => Router.go(Routes.Home),
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
    const data = isValidForm.bind(this)(e.target as HTMLFormElement)
    if (data) {
      AuthController.signup(data as unknown as SignupData)
    } else {
      console.error('Форма не валидна')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
