import BaseAPI from './BaseAPI'
import { User } from './AuthAPI'

export class UsersApi extends BaseAPI {
  constructor() {
    super('/user')
  }

  updateUser(data: Partial<User>) {
    return this.http.put('/profile', data)
  }

  updateUserPassword(data: Partial<User>) {
    return this.http.put('/password', data)
  }

  read(id: number): Promise<User> {
    return this.http.get(`/${id}`)
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new UsersApi()
