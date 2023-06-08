export type Indexed<T = any> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed)
      } else {
        lhs[p] = rhs[p]
      }
    } catch (e) {
      lhs[p] = rhs[p]
    }
  }

  return lhs
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any)

  return merge(object as Indexed, result)
}

function getMonthName(monthNumber: number) {
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]
  return monthNames[monthNumber]
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const isToday = date.getDate() === now.getDate()
    && date.getMonth() === now.getMonth()
    && date.getFullYear() === now.getFullYear()

  const day = isToday ? '' : `${date.getDate()} `
  const month = isToday ? '' : getMonthName(date.getMonth())
  const time = `${date.getHours()}:${(`0${date.getMinutes()}`).slice(-2)}`

  return `${day}${month} ${time}`
}

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
  return isPlainObject(value) || isArray(value)
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  // Сравнение количества ключей объектов и массивов
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key]
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // И TypeScript это обрабатывает
      // @ts-ignore
      if (isEqual(value, rightValue)) {
        continue
      }
      return false
    }

    if (value !== rightValue) {
      return false
    }
  }

  return true
}

export function queryStringify(data: Record<string, unknown>) {
  const keyValuePairs = []
  for (const key in data) {
    keyValuePairs.push(`${key}=${data[key]}`)
  }
  return `?${keyValuePairs.join('&')}`
}
