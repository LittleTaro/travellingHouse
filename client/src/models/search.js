import { getLists } from '@/services/search'
export default {
  namespace: 'search',
  state: {
    text: 'dva',
    lists: []
  },
  // 同步
  reducers: {
    getLists(state, action) {
      return {
        ...state,
        lists: action.payload,
      }
    }
  },
  //  异步
  effects: {
    *getListsAsync({payload},{call, put}) {
      //  call主要用来调用异步函数
      const res = yield call(getLists, payload);
      //  put主要用于事件派发
      yield put ({
        type: 'getLists',
        payload: res.lists
      })
    }
  }
};