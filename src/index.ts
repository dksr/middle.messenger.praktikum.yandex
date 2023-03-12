import Router from './utils/Router'
import AuthPage from './pages/AuthPage'
import RegPage from './pages/RegPage'
import ChatsPage from './pages/ChatsPage'
import ErrorPage from './pages/ErrorPage'
import ProfilePage from './pages/ProfilePage'

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use('/', AuthPage)
    .use('/sign-up', RegPage)
    .use('/settings', ProfilePage)
    .use('/messenger', ChatsPage)
    .use('/error404', ErrorPage)
    .start()
})
