import API, { ChatsAPI } from '../api/ChatsAPI'
import MessagesController from './MessagesController'
import store from '../core/Store'
import { formatDate } from '../utils/helpers'
import chatImg from '../../static/chat-img.png'

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

    chats.map(async (chat) => {
      if (chat.last_message && chat.last_message.time) {
        chat.last_message.time = formatDate(chat.last_message.time)
      }
      if (chat.avatar === null) {
        chat.avatar = chatImg
      }
      const token = await this.getToken(chat.id)

      await MessagesController.connect(chat.id, token)
    })

    store.set('chats', chats)
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId])
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
