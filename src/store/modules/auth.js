const state = {
  user: '',
  password: '',
  authorized: false,
  self: {}
}

const mutations = {
  SET_AUTHORIZED (state, authorized) {
    state.authorized = authorized
  },
  SET_USER (state, user) {
    state.self = user
    state.user = user.name
  },
  SET_PASSWORD (state, password) {
    state.password = password
  }
}

export default {
  state,
  mutations
}
