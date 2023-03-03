import Block from '../../../core/Block'
import template from './profileAvatar.hbs'
import Link from '../../ui/Link'
import ModalAvatar from '../ModalAvatar'
import avatarImg from '../../../../static/no-avatar.png'

interface IProfileAvatarProps {
  showEditAvatarModal: boolean,
  events?: Record<string, (event: Event) => void>
}

export default class ProfileAvatar extends Block<IProfileAvatarProps> {
  init() {
    this.children = {
      AvatarLink: new Link({
        label: `
            <img src="${avatarImg}" alt="empty avatar">
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
