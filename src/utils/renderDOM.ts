import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import RegPage from '../pages/RegPage'
import ChatsPage from '../pages/ChatsPage'
import ProfilePage from '../pages/ProfilePage'
import ProfileEditPage from '../pages/ProfileEditPage'
import ProfilePasswordEditPage from '../pages/ProfilePasswordEditPage'
import ErrorPage from '../pages/ErrorPage'

export const ROUTES = {
  home: HomePage,
  auth: AuthPage,
  reg: RegPage,
  chats: ChatsPage,
  profile: ProfilePage,
  'profile-edit': ProfileEditPage,
  'profile-password-edit': ProfilePasswordEditPage,
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
