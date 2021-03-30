export default {
  addCart(context, payload) {
    let oldProduct = context.state.cartList.find(item  => item.iid == payload.iid)

    if(oldProduct) {
      context.commit("addCount", oldProduct)
    } else {
      payload.count = 1
      payload.check = false
      context.commit("addToCart", payload)
    }
  },
  checkChange(context, payload) {
    let oldProduct = context.state.cartList.find(item  => item.iid == payload.iid)
    context.commit("selectChange", oldProduct)
  }
}