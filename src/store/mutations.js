export default {
  addCount(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    state.cartList.push(payload)
  },
  selectChange(state, payload) {
    payload.check = !payload.check
  },
  fillUserInfo(state, payload) {
    state.userInfo = payload;
    state.userInfo.isExist = true;
  }
}