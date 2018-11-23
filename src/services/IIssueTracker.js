Interface IIssueTracker {
  setAuth (auth)

  authenticate (auth) 

  getSprintReport (boardId, sprintId) 

  getSprintList (boardId, count)

  getBoards (name)

  getSprintIssues (boardId, sprintId, issueKeys)

  getSprintBacklog (boardId)

  getData (endpoint, auth)
}