import Block from '../../core/Block'
import template from './profilePasswordEditPage.hbs'
import backImg from '../../../static/profile-back.svg'
import avatarImg from '../../../static/no-avatar.png'

export default class ProfilePasswordEditPage extends Block {
  render() {
    return this.compile(template, { backImg, avatarImg })
  }
}
