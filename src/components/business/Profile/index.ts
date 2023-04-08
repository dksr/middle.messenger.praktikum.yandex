import Block from '../../../core/Block'
import template from './profile.hbs'
import ProfileAvatar from '../ProfileAvatar'
import ProfileTable from '../ProfileTable'
import Link from '../../ui/Link'
import ProfileForm from '../Forms/ProfileForm'
import ProfilePasswordForm from '../Forms/ProfilePasswordForm'
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
      ProfileAvatar: new ProfileAvatar(this.props),
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

  render() {
    return this.compile(template, this.props)
  }
}

// @ts-ignore
export default withProfileShow(withUser(Profile))
