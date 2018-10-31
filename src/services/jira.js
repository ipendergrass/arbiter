import axios from 'axios'

export default {

  domain: '',
  auth: {user: '', password: ''},

  setAuth (auth) {
    this.auth = auth
  },

  authenticate (auth) {
    let endpoint = '/rest/api/2/myself'
    return this.getData(endpoint, auth)
  },

  getSprintReport (boardId, sprintId) {
    let endpoint = '/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=' + boardId + '&sprintId=' + sprintId
    return this.getData(endpoint, this.auth)
  },

  getSprintList (boardId, count) {
    let endpoint = '/rest/agile/1.0/board/' + boardId + '/sprint?startAt=' + count
    return this.getData(endpoint, this.auth)
  },

  getBoards (name) {
    let endpoint = '/rest/agile/1.0/board?name=ISS%20IDE&maxResults=1000'
    if (name !== undefined) {
      endpoint = '/rest/agile/1.0/board?name=' + escape(name) + '&maxResults=1000'
    }
    return this.getData(endpoint, this.auth)
  },

  getSprintIssues (boardId, sprintId, issueKeys) {
    let endpoint = '/rest/agile/1.0/board/' + boardId + '/sprint/' + sprintId + '/issue?maxResults=1000&jql=key in (' + issueKeys + ')&fields=closedSprints,customfield_11204'
    return this.getData(endpoint, this.auth)
  },

  getSprintBacklog (boardId) {
    let endpoint = '/rest/agile/1.0/board/' + boardId + '/backlog?maxResults=1000'
    return this.getData(endpoint, this.auth)
  },

  getData (endpoint, auth) {
    return axios.get(endpoint, {auth: auth})
  }
}
