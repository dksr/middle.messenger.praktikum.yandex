import HomePage from '../pages/HomePage'
import ChatsPage from '../pages/ChatsPage'
import ErrorPage from '../pages/ErrorPage'

const ROUTES = {
  home: HomePage,
  // auth: AuthPage,
  // reg: RegPage,
  chats: ChatsPage,
  // profile: ProfilePage,
  // 'profile-edit': ProfileEditPage,
  // 'profile-password-edit': ProfilePasswordEditPage,
  // 'profile-avatar-edit': ProfileAvatarEditPage,
  error: ErrorPage,
}

export default function renderDOM(route: keyof typeof ROUTES) {
  const root = document.querySelector('#app')
  root!.innerHTML = ''
  const PageComponent = ROUTES[route]
  const page = new PageComponent()
  root!.append(page.getContent()!)
  page.dispatchComponentDidMount()
}
