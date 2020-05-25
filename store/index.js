export const state = () => ({
  cartMap: {},
  isCartOpen: false,
  isMenuOpen: false
})

export const mutations = {
  addCartMap(state, id) {
    const tempMap = JSON.parse(JSON.stringify(state.cartMap))
    if (!tempMap[id]) {
      tempMap[id] = 1
    } else {
      tempMap[id]++
    }
    state.cartMap = tempMap
  },
  reduceCartMap(state, id) {
    const tempMap = JSON.parse(JSON.stringify(state.cartMap))
    if (tempMap[id] && tempMap[id] > 0) {
      tempMap[id]--
      state.cartMap = tempMap
    }
  },
  removeCartMap(state, id) {
    const tempMap = JSON.parse(JSON.stringify(state.cartMap))
    if (tempMap[id]) {
      delete tempMap[id]
      state.cartMap = tempMap
    }
  },
  setIsCartOpen(state, flag) {
    state.isCartOpen = flag
    state.isMenuOpen = false
  },
  setIsMenuOpen(state, flag) {
    state.isMenuOpen = flag
    state.isCartOpen = false
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
  },
  setIsMenuOpen({ commit }, flag) {
    commit('setIsMenuOpen', flag)
  }
}
