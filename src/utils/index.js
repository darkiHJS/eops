import { ORDER_MODEL_IMG } from '@/config'

// import { ... } from '@/utils/index'


export const getOrderModelImg = (ordername) => {
  return ORDER_MODEL_IMG[ordername] || ORDER_MODEL_IMG['default']
}

/**
 * 
 * @param {String} add_key 变化的key
 */
export const createConstStorageKey = (add_key) => {
  const globel_header_key = "SUNGCOR_STORAGE_SAVE_WORLD_"
  return globel_header_key + add_key
}

/**
 * sessionStorage set 
 * sessionStorage get
 */
export const session_set = (key, value) => {
  if(typeof value === 'object') {
    value = JSON.stringify(value)
  }
  sessionStorage.setItem(key, value)
}

export const session_get = (key) => {
  let value = sessionStorage.getItem(key)
  if(/^\{|\[*\}\b|\]\b/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}

/**
 * localStorage set 
 * localStorage get
 */
export const local_set = (key, value) => {
  if(typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const local_get = (key) => {
  let value = localStorage.getItem(key)
  if(/^\{|\[*\}\b|\]\b/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}
