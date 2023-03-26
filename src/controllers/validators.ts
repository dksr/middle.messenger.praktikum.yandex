import Block from '../core/Block'

function _hasError(element: HTMLInputElement, regex: RegExp) {
  const str = element.value
  let error = true
  if (regex.test(str)) {
    error = false
  }
  return error
}

export function loginValidator(this: Block, element: HTMLInputElement) {
  const regex = /^(?!^-+$)(?!^_+$)(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
  const error = _hasError(element, regex)

  this.children.LoginField.setProps({
    hasError: error,
  })

  return !error
}

export function passwordValidator(this: Block, element: HTMLInputElement) {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
  const error = _hasError(element, regex)

  this.children.PasswordField.setProps({
    hasError: error,
  })
  return !error
}
export function oldPasswordValidator(this: Block, element: HTMLInputElement) {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
  const error = _hasError(element, regex)

  this.children.OldPasswordField.setProps({
    hasError: error,
  })
  return !error
}

export function passwordConfirmValidator(this: Block, element: HTMLInputElement) {
  const error = (this.children.PasswordField.children.Input.element as HTMLInputElement).value
    !== element.value

  this.children.PasswordConfirmField.setProps({
    hasError: error,
  })
  return !error
}

export function emailValidator(this: Block, element: HTMLInputElement) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const error = _hasError(element, regex)

  this.children.EmailField.setProps({
    hasError: error,
  })
  return !error
}

export function firstNameValidator(this: Block, element: HTMLInputElement) {
  const regex = /^[A-ZА-ЯЁ][a-zа-яё-]*$/
  const error = _hasError(element, regex)

  this.children.FirstNameField.setProps({
    hasError: error,
  })
  return !error
}

export function secondNameValidator(this: Block, element: HTMLInputElement) {
  const regex = /^[A-ZА-ЯЁ][a-zа-яё-]*$/
  const error = _hasError(element, regex)

  this.children.SecondNameField.setProps({
    hasError: error,
  })
  return !error
}
export function chatNameValidator(this: Block, element: HTMLInputElement) {
  const regex = /^[А-ЯA-Z][А-Яа-яA-Za-z]*$/
  const error = _hasError(element, regex)

  this.children.ChatNameField.setProps({
    hasError: error,
  })
  return !error
}
export function phoneValidator(this: Block, element: HTMLInputElement) {
  const regex = /^\+?\d{10,15}$/
  const error = _hasError(element, regex)

  this.children.PhoneField.setProps({
    hasError: error,
  })
  return !error
}
export function messageValidator(this: Block, element: HTMLInputElement) {
  const regex = /^\S+$/
  const error = _hasError(element, regex)

  this.children.FieldMessage.setProps({
    hasError: error,
  })
  return !error
}

export function isValidForm(this: Block, form: HTMLFormElement) {
  let valid = true
  const data: Record<string, string> = {}

  form.querySelectorAll('input').forEach((input) => {
    if (input.name === 'login') {
      valid = loginValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'password' || input.name === 'newPassword') {
      valid = passwordValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'oldPassword') {
      valid = oldPasswordValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'password_confirm') {
      valid = passwordConfirmValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'email') {
      valid = emailValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'first_name') {
      valid = firstNameValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'second_name') {
      valid = secondNameValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'display_name') {
      valid = chatNameValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'phone') {
      valid = phoneValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
    if (input.name === 'message') {
      valid = messageValidator.bind(this)(input) && valid
      if (valid) {
        data[input.name] = input.value
      }
    }
  })
  if (valid) {
    return data
  }
  return false
}
