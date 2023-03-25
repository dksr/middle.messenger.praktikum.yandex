import Block from '../../../core/Block'
import template from './profile.hbs'
import ProfileAvatar from '../ProfileAvatar'
import Heading from '../../ui/Heading'
import ProfileTable from '../ProfileTable'
import Link from '../../ui/Link'
import ProfileForm from '../ProfileForm'
import ProfilePasswordForm from '../ProfilePasswordForm'
import Router from '../../../utils/Router'
import { withUser } from '../../../core/Store'
import { Routes } from '../../../index'
import { User } from '../../../api/AuthAPI'

interface IProfileProps extends User{
  editProfile: boolean,
  editProfilePassword: boolean,
}

class Profile extends Block<IProfileProps> {
  init() {
    this.children = {
      ProfileAvatar: new ProfileAvatar({
        showEditAvatarModal: false,
        events: {
          click: this._showAvatarModal.bind(this),
        },
      }),
      ProfileHeading: new Heading({
        label: this.props.first_name,
        class: 'profile-content__title',
      }),
      ProfileTable: new ProfileTable({}),
      ProfileEditLink: new Link({
        label: 'Изменить данные',
        class: 'profile-content__link',
        events: {
          click: () => {
            this.setProps({
              editProfile: true,
            })
          },
        },
      }),
      ProfilePasswordEditLink: new Link({
        label: 'Изменить пароль',
        class: 'profile-content__link',
        events: {
          click: () => {
            this.setProps({
              editProfilePassword: true,
            })
          },
        },
      }),
      ProfileLogoutLink: new Link({
        label: 'Выйти',
        class: 'profile-content__link profile-content__link_red',
        events: {
          click: () => Router.go(Routes.Home),
        },
      }),
      ProfileForm: new ProfileForm({}),
      ProfilePasswordForm: new ProfilePasswordForm({}),
    }
  }

  private _showAvatarModal(event: Event) {
    const { id } = event.target as HTMLElement
    if (id === 'modalEditAvatar') {
      this.children.ProfileAvatar.setProps({
        showEditAvatarModal: false,
      })
    }
    if (id === 'modalAvatarOpen') {
      this.children.ProfileAvatar.setProps({
        showEditAvatarModal: true,
      })
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

// @ts-ignore
export default withUser(Profile)
