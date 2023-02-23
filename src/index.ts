import HomePage from './pages/Home'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')
  const homePage = new HomePage({ rootClass: 'nav-content' })
  root!.append(homePage.getContent()!)
  homePage.dispatchComponentDidMount()
})
