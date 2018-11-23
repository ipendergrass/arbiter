const state = {
  methodology: 'scrum',
  epics: [],
  board: [],
  sprint: { info: {}, burndown: [], rapidView: {}, fullIssues: [], backlog: [], epics: [] },
  kanban: { report: {}, fullIssues: [], controlChart: {} }
}

const mutations = {
  SET_SPRINT_BACKLOG (state, data) {
    state.backlog = data
  },
  CLEAR_SPRINT_BACKLOG (state) {
    state.backlog.length = 0
  },
  SET_SPRINT (state, sprint) {
    state.sprint.info = sprint
  },
  CLEAR_SPRINT (state) {
    state.sprint.info = {}
  },
  ADD_TO_EPICS (state, epic) {
    state.epics.push(epic)
  },
  CLEAR_EPICS (state) {
    state.epics.length = 0
  },
  SET_BOARD (state, board) {
    state.board = board
  },
  ADD_TO_BURNDOWN (state, data) {
    state.sprint.sprint.burndown.push(data)
  },
  SET_SPRINT_RAPID_VIEW (state, data) {
    state.sprint.rapidView = data
  },
  SET_SPRINT_FULL_ISSUES (state, data) {
    state.sprint.fullIssues = data
  },
  SET_SPRINT_EPICS (state, data) {
    state.sprint.epics = data
  },
  SET_KANBAN (state, data) {
    state.kanban.report = data
  },
  DELETE_KANBAN (state) {
    state.kanban.report = {}
  },
  SET_KANBAN_FULL_ISSUES (state, data) {
    state.kanban.fullIssues = data
  },
  SET_KANBAN_CONTROL_CHART (state, data) {
    state.kanban.controlChart = data
  },
  SET_METHODOLOGY (state, data) {
    state.methodology = data
  }
}

export default {
  state,
  mutations
}
