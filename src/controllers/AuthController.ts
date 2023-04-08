import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'
import router from '../utils/Router'
import MessagesController from './MessagesController'
import store from '../core/Store'
import { Routes } from '../index'
import { RESOURCES } from '../utils/HTTPTransport'
import avatarImg from '../../static/no-avatar.png'

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
    if (user.avatar) {
      user.avatar = RESOURCES + user.avatar
    } else {
      user.avatar = avatarImg
    }
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
