import Block from '../../core/Block'
import template from './profilePage.hbs'
import ProfileSidebar from '../../components/business/ProfileSidebar'
import Profile from '../../components/business/Profile'

export default class ProfilePage extends Block {
  protected init() {
    this.children = {
      ProfileSidebar: new ProfileSidebar({}),
      Profile: new Profile({
        editProfile: false,
        editProfilePassword: false,
      }),
    }
  }

  render() {
    return this.compile(template, {})
  }
}
