import { isEqual, set } from '../utils/helpers'
import { EventBus } from './EventBus'
import Block from './Block'
import { User } from '../api/AuthAPI'
import { ChatInfo } from '../api/ChatsAPI'
import { IMessage } from '../controllers/MessagesController'

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  user: User,
  chats: ChatInfo[],
  messages: Record<number, IMessage[]>,
  selectedChat?: number,
  searchChatQuery?: string,
  profileShow: {
    editProfile: boolean,
    editProfilePassword: boolean,
    editProfileAvatarModal: boolean
  },
  showModalChatSettings: boolean,
  showModalAddChat: boolean,
  showModalDeleteChat: boolean,
  showModalAddChatUser: boolean,
  showModalDeleteChatUser: boolean,
}

class Store extends EventBus {
  private state: any = {}

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data)

    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }
}

const store = new Store()

// @ts-ignore
window.store = store

export function withStore<SP extends Record<string, any>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState())

        super({ ...(props as P), ...previousState })

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState())

          if (isEqual(previousState, stateProps)) {
            return
          }

          previousState = stateProps

          // @ts-ignore
          this.setProps({ ...stateProps })
        })
      }
    }
  }
}

export default store

export const withUser = withStore((state) => ({ ...state.user }))
export const withProfileShow = withStore((state) => ({ ...state.profileShow }))
export const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }))
export const withSelectedChat = withStore((state) => ({ selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat) }))
export const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    }
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  }
})
export const withSearchChatQuery = withStore((state) => ({ searchChatQuery: state.searchChatQuery }))

export const withShowModalChatSettings = withStore((state) => ({ showModalChatSettings: state.showModalChatSettings }))
export const withShowModalAddChat = withStore((state) => ({ showModalAddChat: state.showModalAddChat }))
export const withShowModalDeleteChat = withStore((state) => ({ showModalDeleteChat: state.showModalDeleteChat }))
export const withShowModalAddChatUser = withStore((state) => ({ showModalAddChatUser: state.showModalAddChatUser }))
export const withShowModalDeleteChatUser = withStore((state) => ({ showModalDeleteChatUser: state.showModalDeleteChatUser }))
