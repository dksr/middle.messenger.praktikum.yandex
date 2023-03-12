import Block from '../../../core/Block'
import template from './profileSidebar.hbs'
import backImg from '../../../../static/profile-back.svg'
import Link from '../../ui/Link'
import Router from '../../../utils/Router'

export default class ProfileSidebar extends Block {
  init() {
    this.children = {
      BackLink: new Link({
        label: `<img src="${backImg}"" alt="back">`,
        events: {
          click: () => Router.go('/messenger'),
        },
      }),
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
