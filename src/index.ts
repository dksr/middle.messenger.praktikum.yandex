import Router from './utils/Router'
import AuthPage from './pages/AuthPage'
import RegPage from './pages/RegPage'
import ChatsPage from './pages/ChatsPage'
import ErrorPage from './pages/ErrorPage'
import ProfilePage from './pages/ProfilePage'
import AuthController from './controllers/AuthController'
import './styles.scss'

export enum Routes {
  Home = '/',
  Register = '/sign-up',
  Profile = '/settings',
  Chats = '/messenger',
  Error = '/error404'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Home, AuthPage)
    .use(Routes.Register, RegPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Chats, ChatsPage)
    .use(Routes.Error, ErrorPage)

  let isAuthPages = false

  if (window.location.pathname === Routes.Home || window.location.pathname === Routes.Register) {
    isAuthPages = true
  }

  try {
    await AuthController.fetchUser()
    Router.start()

    if (isAuthPages) {
      Router.go(Routes.Chats)
    }
  } catch (e) {
    Router.start()
    if (!isAuthPages) {
      Router.go(Routes.Home)
    }
  }
})
