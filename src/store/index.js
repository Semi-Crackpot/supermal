import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  cartList:[]
}

const store = new createStore({
  state,
  mutations,
  getters,
  actions,
})


export default store