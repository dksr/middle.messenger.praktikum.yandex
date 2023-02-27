import Block from '../../../core/Block'
import template from './profileTable.hbs'

export default class ProfileTable extends Block {
  render() {
    return this.compile(template, {})
  }
}
