import Block from '../../../core/Block'
import template from './profileTable.hbs'
import { withUser } from '../../../core/Store'

class ProfileTable extends Block {
  render() {
    return this.compile(template, this.props)
  }
}

export default withUser(ProfileTable)
