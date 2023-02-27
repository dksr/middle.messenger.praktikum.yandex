import Block from '../../../core/Block'
import template from './profileSidebar.hbs'
import backImg from '../../../../static/profile-back.svg'
import Link from '../../ui/Link'
import renderDOM from '../../../utils/renderDOM'

export default class ProfileSidebar extends Block {
  protected init() {
    this.children = {
      BackLink: new Link({
        label: `<img src="${backImg}"" alt="back">`,
        events: {
          click: () => renderDOM('home'),
        },
      }),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
