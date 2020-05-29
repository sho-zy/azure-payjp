import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'azure-payjp',
      paths: ['cartMap']
    })(store)
  })
}
