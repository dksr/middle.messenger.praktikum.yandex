import API, { UsersApi } from '../api/UsersApi'
import { User } from '../api/AuthAPI'
import store from '../core/Store'

class UsersController {
  private readonly api: UsersApi

  constructor() {
    this.api = API
  }

  async updateUser(data: Partial<User>) {
    try {
      const newUser = await this.api.updateUser(data)
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
}

export default new UsersController()
