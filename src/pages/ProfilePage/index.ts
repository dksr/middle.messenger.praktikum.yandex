import Block from '../../core/Block'
import template from './profilePage.hbs'
import backImg from '../../../static/profile-back.svg'
import avatarImg from '../../../static/no-avatar.png'

export default class ProfilePage extends Block {
  render() {
    return this.compile(template, { backImg, avatarImg })
  }
}
