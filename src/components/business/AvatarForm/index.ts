import Block from '../../../core/Block'
import template from './avatarForm.hbs'
import UsersController from '../../../controllers/UsersController'

interface IAvatarFormProps {
  events?: Record<string, (e: Event) => void>
}

export default class AvatarForm extends Block<IAvatarFormProps> {
  init() {
    // this.children = {
    //   avatarInput: new Input({
    //     name: 'avatar',
    //     class: 'avatar_hidden',
    //     type: 'file',
    //     id
    //   }),
    //   SubmitButton: new Button({
    //     label: 'Поменять',
    //     class: 'button-auth',
    //     type: 'submit',
    //   }),
    // }

    this.setProps({
      events: {
        submit: this.onSubmit.bind(this),
      },
    })
  }

  onSubmit(e: Event) {
    e.preventDefault()
    const file = ((e.target as HTMLFormElement)[0] as HTMLInputElement).files![0]
    if (file) {
      UsersController.updateUserAvatar(file)
    } else {
      console.error('Форма не валидна')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
