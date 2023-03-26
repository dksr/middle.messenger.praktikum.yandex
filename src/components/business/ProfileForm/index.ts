import Block from '../../../core/Block'
import template from './profileForm.hbs'
import FieldRow from '../../ui/FieldRow'
import Button from '../../ui/Button'
import {
  chatNameValidator,
  emailValidator, firstNameValidator, isValidForm, loginValidator,
  phoneValidator, secondNameValidator,
} from '../../../controllers/validators'
import { withUser } from '../../../core/Store'
import { User } from '../../../api/AuthAPI'
import UsersController from '../../../controllers/UsersController'

interface IProfileFormProps extends User {
  events?: Record<string, (e: Event) => void>
}

class ProfileForm extends Block<IProfileFormProps> {
  init() {
    this.children = {
      EmailField: new FieldRow({
        label: 'Почта',
        name: 'email',
        hasError: false,
        errorText: 'Неверный e-mail',
        type: 'text',
        class: 'field-value',
        value: this.props.email,
        events: {
          blur: (e: Event) => emailValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      LoginField: new FieldRow({
        label: 'Логин',
        name: 'login',
        hasError: false,
        errorText: 'Логин от 3 до 20 символов, латиница, может содержать цифры, _ и -',
        type: 'text',
        class: 'field-value',
        value: this.props.login,
        events: {
          blur: (e: Event) => loginValidator.bind(this as any)(e.target as HTMLInputElement),
        },
      }),
      FirstNameField: new FieldRow({
        label: 'Имя',
        name: 'first_name',
        hasError: false,
        errorText: 'Имя должно начинаться с большой буквы, без пробелов, цифр и спецсимволов',
        type: 'text',
        class: 'field-value',
        value: this.props.first_name,
        events: {
          blur: (e: Event) => firstNameValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SecondNameField: new FieldRow({
        label: 'Фамилия',
        name: 'second_name',
        hasError: false,
        errorText: 'Фамилия должна начинаться с большой буквы, без пробелов, цифр и спецсимволов',
        type: 'text',
        class: 'field-value',
        value: this.props.second_name,
        events: {
          blur: (e: Event) => secondNameValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      ChatNameField: new FieldRow({
        label: 'Имя в чате',
        name: 'display_name',
        hasError: false,
        errorText: 'Имя в чате должно начинаться с большой буквы, без пробелов, цифр и спецсимволов',
        type: 'text',
        class: 'field-value',
        value: this.props.display_name,
        events: {
          blur: (e: Event) => chatNameValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      PhoneField: new FieldRow({
        label: 'Телефон',
        name: 'phone',
        hasError: false,
        errorText: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
        type: 'text',
        class: 'field-value',
        value: this.props.phone,
        events: {
          blur: (e: Event) => phoneValidator.bind(this)(e.target as HTMLInputElement),
        },
      }),
      SubmitButton: new Button({
        label: 'Сохранить',
        class: 'profile-content__save-button',
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
      UsersController.updateUser(data)
    } else {
      console.error('Форма не валидна')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default withUser(ProfileForm)
