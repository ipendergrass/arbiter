const state = {
  boardList: [],
  sprintList: [],
  users: [],
  menuItems: []
}

const mutations = {
  ADD_TO_BOARD_LIST (state, board) {
    state.boardList.push(board)
  },
  CLEAR_BOARD_LIST (state) {
    state.boardList.length = 0
  },
  ADD_TO_SPRINT_LIST (state, issue) {
    state.sprintList.push(issue)
  },
  CLEAR_SPRINT_LIST (state) {
    state.sprintList.length = 0
  },
  ADD_TO_USERS (state, user) {
    state.users.push(user)
  },
  CLEAR_USERS (state) {
    state.users.length = 0
  },
  SET_MENU_ITEMS (state, items) {
    state.menuItems = items
  }
}

export default {
  state,
  mutations
}
