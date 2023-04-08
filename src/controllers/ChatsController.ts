import API, { ChatsAPI } from '../api/ChatsAPI'
import MessagesController from './MessagesController'
import store from '../core/Store'
import { formatDate } from '../utils/helpers'
import chatImg from '../../static/chat-img.png'
import { RESOURCES } from '../utils/HTTPTransport'
import UsersController from './UsersController'

class ChatsController {
  private readonly api: ChatsAPI

  constructor() {
    this.api = API
  }

  async create(title: string) {
    await this.api.create(title)

    this.fetchChats()
    store.set('showModalAddChat', false)
  }

  async fetchChats() {
    const chats = await this.api.read()

    await Promise.all(chats.map(async (chat) => {
      if (chat.last_message && chat.last_message.time) {
        chat.last_message.time = formatDate(chat.last_message.time)
      }
      if (chat.avatar === null) {
        chat.avatar = chatImg
      } else {
        chat.avatar = RESOURCES + chat.avatar
      }

      chat.chat_users = await this.getChatUsers(chat.id)

      const token = await this.getToken(chat.id)

      await MessagesController.connect(chat.id, token)
    }))

    store.set('chats', chats)
  }

  async addUserToChat(chatId: number, login: string) {
    const userId = await UsersController.searchUserByLogin(login)
    if (chatId && userId) {
      await this.api.addUsers(chatId, [userId])
      store.set('showModalAddChatUser', false)
      this.fetchChats()
    } else {
      console.error('ID пользовтеля или чата неверные')
    }
  }

  async deleteUsersFromChat(chatId: number, login: string) {
    const userId = await UsersController.searchUserByLogin(login)
    if (chatId && userId) {
      await this.api.deleteUsers(chatId, [userId])
      store.set('showModalDeleteChatUser', false)
      this.fetchChats()
    } else {
      console.error('ID пользовтеля или чата неверные')
    }
  }

  async getChatUsers(chatId: number) {
    const chatUsers = await this.api.getUsers(chatId)
    const stringUsers = chatUsers
      .map((user) => `${user.first_name} ${user.second_name} (${user.login})`)
      .join(', ')
    return stringUsers
  }

  async delete(id: number) {
    await this.api.delete(id)

    this.fetchChats()
  }

  getToken(id: number) {
    return this.api.getToken(id)
  }

  selectChat(id: number) {
    store.set('selectedChat', id)
  }
}

const controller = new ChatsController()

// @ts-ignore
window.chatsController = controller

export default controller
