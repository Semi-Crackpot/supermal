export default {
  getLength(state){
    return state.cartList.length
  },
  getCartList(state){
    return state.cartList
  },
  getUserInfo(state){
    return state.userInfo
  }
}