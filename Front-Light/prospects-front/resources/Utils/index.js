import lodash from 'lodash'

const ENV = process.env.REACT_APP_MODE

const constants = {
  localStorage: {
    APP: 'app',
    USER: 'user',
    MODULES: 'modules',
    MENU: 'menu',
    BUSINESS_UNIT: 'businessUnit',
    SNACKBAR: 'snackbar',
  },
  status: {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    ERROR: 500,
  },
}

const validateEmail = (value) => {
  return String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const validateCellphone = (value) => {
  return value.match(/\d/g).length === 10
}

const isEmpty = (value) => {
  try {
    return lodash.isEmpty(value)
  } catch (e) {
    return true
  }
}

const isNotEmpty = (value) => {
  return !isEmpty(value)
}


const cloneJson = function (json = {}) {
  return JSON.parse(JSON.stringify(json))
}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const removeAccents = (string) => {
  string = string.replace(/á/gi, 'a')
  string = string.replace(/é/gi, 'e')
  string = string.replace(/í/gi, 'i')
  string = string.replace(/ó/gi, 'o')
  string = string.replace(/ú/gi, 'u')

  return string
}

const onlyLetters = (string) => {
  const re = /^[a-zA-Z\s]*$/

  return string === '' || re.test(string)
}

const onlyNumbers = (string) => {
  const re = /[0-9]|\./

  return string === '' || re.test(string)
}

const encode = function (input) {
  const _keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let output = ''
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4
  let i = 0
  input = _utf8_encode(input)
  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4)
  }
  return output
}

const decode = function (input) {
  const _keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let output = ''
  let chr1, chr2, chr3
  let enc1, enc2, enc3, enc4
  let i = 0
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++))
    enc2 = _keyStr.indexOf(input.charAt(i++))
    enc3 = _keyStr.indexOf(input.charAt(i++))
    enc4 = _keyStr.indexOf(input.charAt(i++))
    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4
    output = output + String.fromCharCode(chr1)
    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2)
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3)
    }
  }
  output = _utf8_decode(output)
  return output
}

const _utf8_encode = function (string) {
  string = string.replace(/\r\n/g, '\n')
  let utftext = ''
  for (let n = 0; n < string.length; n++) {
    const c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }
  }
  return utftext
}

const _utf8_decode = function (utftext) {
  let string = ''
  let i = 0
  let c
  let c2
  let c3 = 0
  while (i < utftext.length) {
    c = utftext.charCodeAt(i)
    if (c < 128) {
      string += String.fromCharCode(c)
      i++
    } else if (c > 191 && c < 224) {
      c2 = utftext.charCodeAt(i + 1)
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
      i += 2
    } else {
      c2 = utftext.charCodeAt(i + 1)
      c3 = utftext.charCodeAt(i + 2)
      string += String.fromCharCode(
        ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      )
      i += 3
    }
  }
  return string
}

const arrayMove = (arr, oldIndex, newIndex) => {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }

  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])

  return arr
}

const request = async (options) => {
  return new Promise((resolve, reject) => {
    req(options, (error, response, body) => {
      if (error) return reject(error)
      return resolve({ body, response })
    })
  })
}

const jsonToArray = function (json) {
  const result = []
  const keys = Object.keys(json)
  keys.forEach(function (key) {
    result.push(json[key])
  })
  return result
}

const isPair = (value) => {
  return Number(value) % 2 === 0
}

const dateWithFormat = (value) => {
  const date = new Date(value)
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  return date.toLocaleDateString('es-ES', options)
}

const createUrlForSrc = (imgSrc, format) => {
  const blob = new Blob([imgSrc], { type: format })
  const urlCreator = window.URL || window.webkitURL
  const node = {
    imageUrl: urlCreator.createObjectURL(blob),
  }

  return node
}

const scrollTop = () => {
  window.scrollTo(0, 0)
}


export const Utils = {
  validateEmail,
  validateCellphone,
  isEmpty,
  isNotEmpty,
  cloneJson,
  numberWithCommas,
  removeAccents,
  onlyLetters,
  onlyNumbers,
  encode,
  decode,
  _utf8_encode,
  _utf8_decode,
  arrayMove,
  request,
  jsonToArray,
  isPair,
  dateWithFormat,
  createUrlForSrc,
  scrollTop,
}
