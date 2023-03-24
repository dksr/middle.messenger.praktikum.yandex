import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'
import router from '../utils/Router'
import MessagesController from './MessagesController'
import store from '../core/Store'
import { Routes } from '../index'

class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data)

      await this.fetchUser()

      router.go(Routes.Chats)
    } catch (e: any) {
      console.error(e.reason)
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data)

      await this.fetchUser()

      router.go(Routes.Chats)
    } catch (e: any) {
      console.error(e.reason)
    }
  }

  async fetchUser() {
    const user = await this.api.read()

    store.set('user', user)
  }

  async logout() {
    try {
      MessagesController.closeAll()

      await this.api.logout()

      router.go(Routes.Home)
    } catch (e: any) {
      console.error(e.reason)
    }
  }
}

export default new AuthController()
