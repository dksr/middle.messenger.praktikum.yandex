import template from './home.hbs'
import Block from '../../core/Block'

interface HomePageProps {
  rootClass?: string;
}

export default class HomePage extends Block {
  constructor(props: HomePageProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
