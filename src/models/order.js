import { ORDER_STATE_SL_KEY } from '@/config'

const defaultState = {
  form: {},
  model_id: "",
  handle_rules: {},
}
/**
 * sessionStorage 保持order的状态
 * @param {Object} state 
 */
const saveState = (state) => {
  if (typeof state === 'object') {
    let objJosn = JSON.stringify(state)
    sessionStorage.setItem(ORDER_STATE_SL_KEY, objJosn)
  }
}
const clearState = () => {
  sessionStorage.removeItem(ORDER_STATE_SL_KEY)
}
export default {
  namespace: 'order',
  state: defaultState,
  reducers: {
    setForm(state, { payload }) {
      let newState = {
        ...state,
        form: {
          ...state.form,
          ...payload
        },
      }
      saveState(newState)
      return newState
    },
    setOrder(state, { payload }) {
      let newState = {
        ...state,
        ...payload
      }
      saveState(newState)
      return newState
    },
    clearState() {
      clearState()
      return {
        ...defaultState
      }
    }
  }
}