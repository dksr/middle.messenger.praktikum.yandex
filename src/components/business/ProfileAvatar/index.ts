import Block from '../../../core/Block'
import template from './profileAvatar.hbs'
import Link from '../../ui/Link'
import ModalAvatar from '../Modals/ModalAvatar'
import avatarImg from '../../../../static/no-avatar.png'
import { withProfileShow, withUser } from '../../../core/Store'
import { User } from '../../../api/AuthAPI'
import { RESOURCES } from '../../../utils/HTTPTransport'

interface IProfileAvatarProps extends User {
  editProfileAvatarModal: boolean,
  events?: Record<string, (event: Event) => void>
}

class ProfileAvatar extends Block<IProfileAvatarProps> {
  init() {
    let avatar = avatarImg
    if (this.props.avatar) {
      avatar = RESOURCES + this.props.avatar
    }
    this.children = {
      AvatarLink: new Link({
        label: `
            <img src="${avatar}" alt="avatar">
            <span id="modalAvatarOpen">Поменять аватар</span>
        `,
      }),
      ModalAvatar: new ModalAvatar({}),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

// @ts-ignore
export default withProfileShow(withUser(ProfileAvatar))
