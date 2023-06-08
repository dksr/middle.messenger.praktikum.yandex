import { expect } from 'chai'
import Link from './index'

describe('Link component', () => {
  it('should render', () => {
    new Link({ label: 'label' })
  })

  it('should render passed label', () => {
    // arrange
    const label = 'Test label'
    // act
    const link = new Link({ label, href: '/' })
    // assert
    expect(link.element?.textContent).to.eq(label)
  })
})
