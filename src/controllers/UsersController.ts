import API, { UsersApi } from '../api/UsersApi'
import { User } from '../api/AuthAPI'
import store from '../core/Store'
import avatarImg from '../../static/no-avatar.png'
import { RESOURCES } from '../utils/HTTPTransport'

class UsersController {
  private readonly api: UsersApi

  constructor() {
    this.api = API
  }

  async updateUser(data: Partial<User>) {
    try {
      const newUser = await this.api.updateUser(data)
      this.makeAvatar(newUser)

      store.set('user', newUser)
      store.set('profileShow.editProfile', false)
    } catch (e: any) {
      console.error(e.reason)
    }
  }

  async updateUserPassword(data: Partial<User>) {
    try {
      await this.api.updateUserPassword(data)
      store.set('profileShow.editProfilePassword', false)
    } catch (e: any) {
      console.error(e.reason)
    }
  }

  async updateUserAvatar(file: File) {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const newUser = await this.api.updateUserAvatar(formData)

      this.makeAvatar(newUser)

      store.set('user', newUser)
      store.set('profileShow.editProfileAvatarModal', false)
    } catch (e: any) {
      console.error(e.reason)
    }
  }

  makeAvatar(user: User) {
    if (user.avatar) {
      user.avatar = RESOURCES + user.avatar
    } else {
      user.avatar = avatarImg
    }
  }
}

export default new UsersController()
