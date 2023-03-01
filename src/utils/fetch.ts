const METHODS = {
  GET: 'GET', POST: 'POST', PUT: 'PUT', PATCH: 'PATCH', DELETE: 'DELETE',
}

function queryStringify(data: any) {
  const keyValuePairs = []
  for (const key in data) {
    keyValuePairs.push(`${key}=${data[key]}`)
  }
  return `?${keyValuePairs.join('&')}`
}

type opt = {
  method?: string,
  timeout?: number | string,
  data?: unknown,
  headers?: unknown
}

export default class HTTPTransport {
  get(url: string, options: opt = {}) {
    if (options.data && typeof options.data === 'object') {
      options.data = queryStringify(options.data)
      url += options.data
    }
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  }
  post(url: string, options: opt = {}) {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  }
  put(url: string, options: opt = {}) {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  }
  patch(url: string, options: opt = {}) {
    return this.request(url, { ...options, method: METHODS.PATCH }, options.timeout)
  }
  delete(url: string, options: opt = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  }

  request = (
    url: string,
    options: opt = { method: METHODS.GET },
    timeout: number | string = 5000,
  ) => {
    const { headers = {}, method, data } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      if (typeof method === 'string') {
        xhr.open(method, url)
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.keys(headers).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        xhr.setRequestHeader(key, headers[key])
      })

      if (typeof timeout === 'number') {
        xhr.timeout = timeout
      }

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
