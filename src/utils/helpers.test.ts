import { expect } from 'chai'
import { Indexed, set } from './helpers'

describe('set helper', () => {
  it('should set a value by keypath', () => {
    // arrange
    const obj = {}
    const path = 'a.b'
    const value = 3

    // act
    const result = set(obj, path, value) as Indexed

    // assert
    expect(result.a.b).to.eq(value)
  })

  it('should return passed `object` parameter if it is not an object', () => {
    // arrange
    const notObj = 'string'

    // act
    const result = set(notObj, 'a.b', 3) as Indexed

    // assert
    expect(result).to.eq(notObj)
  })

  it('should throw an Error if passed `path` parameter is not a string', () => {
    const path = 3

    const func = () => set({}, path as any, 0)

    expect(func).to.throw(Error)
  })

  it('should mutate passed object, not create a new one', () => {
    // arrange
    const obj = {}
    const path = 'a.b'
    const value = 3

    // act
    set(obj, path, value) as Indexed

    // assert
    expect(obj).to.haveOwnProperty('a')
  })
})
