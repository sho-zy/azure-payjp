const targetMap = {
  menu: 'isMenuOpen',
  cart: 'isCartOpen'
}

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
    if (tempMap[id] && tempMap[id] > 1) {
      tempMap[id]--
    } else if (tempMap[id] && tempMap[id] === 1) {
      delete tempMap[id]
    }
    state.cartMap = tempMap
  },
  removeCartMap(state, id) {
    const tempMap = JSON.parse(JSON.stringify(state.cartMap))
    if (tempMap[id]) {
      delete tempMap[id]
      state.cartMap = tempMap
    }
  },
  initCartMap(state) {
    state.cartMap = {}
  },
  modalOpen(state, target) {
    Object.keys(targetMap).forEach((key) => {
      state[targetMap[key]] = key === target
    })
  },
  modalClose(state) {
    Object.keys(targetMap).forEach((key) => {
      state[targetMap[key]] = false
    })
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
  initCartMap({ commit }) {
    commit('initCartMap')
  },
  modalOpen({ commit }, target) {
    commit('modalOpen', target)
  },
  modalClose({ commit }) {
    commit('modalClose')
  }
}
