export const state = () => ({
  cartMap: {},
  cartNum: 0,
  isCartOpen: false
})

export const mutations = {
  addCartMap(state, id) {
    if (!state.cartMap[id]) {
      state.cartMap[id] = 1
      state.cartNum++
    } else {
      state.cartMap[id]++
    }
  },
  reduceCartMap(state, id) {
    if (state.cartMap[id] && state.cartMap[id] > 0) {
      state.cartMap[id]--
      if (state.cartMap[id] === 0) state.cartNum--
    }
  },
  removeCartMap(state, id) {
    if (state.cartMap[id]) {
      delete state.cartMap[id]
      state.cartNum--
    }
  },
  setIsCartOpen(state, flag) {
    state.isCartOpen = flag
  }
}

export const actions = {
  addCartMap({ commit }, id) {
    commit('addCartMap', id)
  },
  reduceCartMap({ commit }, id) {
    commit('reduceCartMap', id)
  },
  removeCartMap({ commit }, id) {
    commit('removeCartMap', id)
  },
  setIsCartOpen({ commit }, flag) {
    commit('setIsCartOpen', flag)
  }
}
