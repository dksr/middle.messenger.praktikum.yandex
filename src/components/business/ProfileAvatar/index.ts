import Block from '../../../core/Block'
import template from './profileAvatar.hbs'
import ModalAvatar from '../Modals/ModalAvatar'
import store, { withProfileShow, withUser } from '../../../core/Store'
import { User } from '../../../api/AuthAPI'

interface IProfileAvatarProps {
  user?: User
  editProfileAvatarModal?: boolean,
  events?: Record<string, (event?: Event) => void>
}

class ProfileAvatar extends Block<IProfileAvatarProps> {
  init() {
    this.children = {
      ModalAvatar: new ModalAvatar({}),
    }
    this.setProps({
      events: {
        click: (event) => {
          if (!(event!.target as HTMLElement).classList.contains('overlay')) {
            store.set('profileShow.editProfileAvatarModal', true)
          }
        },
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

// @ts-ignore
export default withProfileShow(withUser(ProfileAvatar))
