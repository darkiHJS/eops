export default {
  namespace: 'user',
  state: {
    user: {}
  },
  reducers: {
    add(state,{payload}) { 
      return {
        ...state,
        ...payload
      }
    },
  },
  effects:{
    *_add({payload}, { put, call }) {
      yield put ({type: 'add'})
    }
  }
}