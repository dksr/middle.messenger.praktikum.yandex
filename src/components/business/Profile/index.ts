import Block from '../../../core/Block'
import template from './profile.hbs'
import ProfileAvatar from '../ProfileAvatar'
import Heading from '../../ui/Heading'
import ProfileTable from '../ProfileTable'
import Link from '../../ui/Link'
import ProfileForm from '../ProfileForm'
import ProfilePasswordForm from '../ProfilePasswordForm'
import store, { withProfileShow, withUser } from '../../../core/Store'
import { User } from '../../../api/AuthAPI'
import AuthController from '../../../controllers/AuthController'

interface IProfileProps extends User {
  editProfile: boolean,
  editProfilePassword: boolean,
}

class Profile extends Block<IProfileProps> {
  init() {
    this.children = {
      ProfileAvatar: new ProfileAvatar({
        // @ts-ignore
        editProfileAvatarModal: false,
        events: {
          click: this._showAvatarModal.bind(this),
        },
      }),
      ProfileHeading: new Heading({
        class: 'profile-content__title',
        label: this.props.first_name,
      }),
      ProfileTable: new ProfileTable({}),
      ProfileEditLink: new Link({
        label: 'Изменить данные',
        class: 'profile-content__link',
        events: {
          click: () => {
            store.set('profileShow.editProfile', true)
          },
        },
      }),
      ProfilePasswordEditLink: new Link({
        label: 'Изменить пароль',
        class: 'profile-content__link',
        events: {
          click: () => {
            store.set('profileShow.editProfilePassword', true)
          },
        },
      }),
      ProfileLogoutLink: new Link({
        label: 'Выйти',
        class: 'profile-content__link profile-content__link_red',
        events: {
          click: () => AuthController.logout(),
        },
      }),
      ProfileForm: new ProfileForm({}),
      ProfilePasswordForm: new ProfilePasswordForm({}),
    }
  }

  private _showAvatarModal(event: Event) {
    const { id } = event.target as HTMLElement
    if (id === 'modalAvatarOpen') {
      store.set('profileShow.editProfileAvatarModal', true)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

// @ts-ignore
export default withProfileShow(withUser(Profile))
