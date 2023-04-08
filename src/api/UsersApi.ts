import BaseAPI from './BaseAPI'
import { User } from './AuthAPI'

export class UsersApi extends BaseAPI {
  constructor() {
    super('/user')
  }

  updateUser(data: Partial<User>): Promise<User> {
    return this.http.put('/profile', data)
  }

  updateUserPassword(data: Partial<User>): Promise<User> {
    return this.http.put('/password', data)
  }

  updateUserAvatar(data: FormData): Promise<User> {
    return this.http.put('/profile/avatar', data)
  }

  searchUser(login: string): Promise<User[]> {
    return this.http.post('/search', { login })
  }

  read(id: number): Promise<User> {
    return this.http.get(`/${id}`)
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new UsersApi()
