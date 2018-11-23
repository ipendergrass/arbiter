<template>
  <div v-if="$isIE11">
    You're gonna need a better browser!!
  </div>
  <v-container fluid v-else>
    <v-layout align-center justify-center row fill-height>
      <v-flex class="white elevation-20" xs6 >
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Login</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Board</v-stepper-step>

            <v-divider v-if="scrumSelected"></v-divider>

            <v-stepper-step v-if="scrumSelected" step="3">Sprint</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                light
                flat
                height="175px"
                align-center
                justify-center
              >
                <v-switch
                  :label="scrumSelected ? 'scrum' : 'kanban'"
                  v-model="scrumSelected"
                  v-on:change="onMethodologyChange"
                />
                <v-text-field v-model="user" prepend-icon="person" label="Username"></v-text-field>
                <v-text-field v-model="password" prepend-icon="lock" label="Password" type="password"></v-text-field>
              </v-card>

              <v-btn
                color="primary"
                @click="authenticate"
              >
                Continue
              </v-btn>

              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                light
                flat
                height="175px">
                <v-combobox
                  v-model="board"
                  v-on:change="boardChange"
                  :items="boardFilter()"
                  item-text="name"
                  label="Choose board"
                  return-object
                ></v-combobox>
              </v-card>

              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Continue
              </v-btn>

              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                light
                flat
                height="175px"
              >
                <v-combobox
                  v-model="sprint"
                  v-on:change="sprintChange"
                  :items="sprintFilter()"
                  item-text="name"
                  label="Choose sprint"
                  return-object
                ></v-combobox>
                <v-switch
                  :label="activeSprints ? 'active' : 'closed'"
                  v-on:change="sprintLabel = activeSprints  ? 'active' : 'closed'"
                  v-model="activeSprints"
                />
                {{sprintLabel}}
              </v-card>

              <v-btn
                color="primary"
                @click="e1 = 1"
              >
                Continue
              </v-btn>

              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Login',
  data () {
    return {
      e1: 0,
      user: '',
      board: '',
      sprint: '',
      password: '',
      sprintLabel: 'active',
      scrumSelected: true,
      activeSprints: true,
      ready: {count: 2, hits: 0}
    }
  },
  methods: {
    onMethodologyChange () {
      this.$store.commit('SET_METHODOLOGY', this.scrumSelected ? 'scrum' : 'kanban')
    },
    // Authenticate against Jira myself endpoint.
    authenticate () {
      let auth = {username: this.user, password: this.password}
      this.$issueTracker.authenticate(auth)
        .then(response => {
          this.$issueTracker.setAuth(auth)
          this.$store.commit('SET_AUTHORIZED', true)
          this.$store.commit('SET_USER', response.data)
          this.$store.commit('SET_PASSWORD', this.password)

          this.$issueTracker.getBoards('ISS IDE')
            .then(response => {
              console.log(response)
              response.data.values.forEach(x => {
                this.$store.commit('ADD_TO_BOARD_LIST', x)
              })
            })
          this.e1 = 2
        })
    },
    // On board change, take appropriate actions for board type
    boardChange (brd) {
      if (brd !== this.$store.state.data.board) {
        this.$store.commit('SET_BOARD', brd)
      }

      switch (brd.type) {
        case 'kanban':
          this.$router.push({ name: 'kanbanDashboard' })
          break
        case 'scrum':
          this.getSprints(brd.id, 0)
          this.getBacklog()
          break
        default:
          break
      }
    },
    // On sprint change, take appropriate actions
    sprintChange (sprint) {
      this.$store.commit('SET_SPRINT', sprint)
      this.$issueTracker.getSprintReport(this.$store.state.data.board.id,
        this.$store.state.data.sprint.info.id)
        .then((response) => {
          this.$store.commit('SET_SPRINT_RAPID_VIEW', response.data.contents)
          let epics = []
          this.getSprintFullIssues(epics)
          this.$store.commit('SET_SPRINT_EPICS', _.uniqBy(epics, 'epicKey'))
          this.nextPage()
        })
    },
    // Retrieve all sprints for the selected board
    getSprints (board, count) {
      this.$issueTracker.getSprintList(board, count)
        .then(response => {
          this.$store.commit('CLEAR_SPRINT_LIST')
          response.data.values.forEach(x => {
            this.$store.commit('ADD_TO_SPRINT_LIST', x)
          })
          if (response.data.values.length === 50) {
            this.getSprints(board, count + 50)
          }
          this.e1 = 3
        }).catch(error => {
          console.log(error)
        })
    },
    // Filter the boards based on the board type
    boardFilter () {
      let boards = []
      this.$store.state.options.boardList.forEach(x => {
        if (x.type === this.$store.state.data.methodology) {
          boards.push(x)
        }
      })
      return boards
    },
    // Filter the sprints based on the sprint state
    sprintFilter () {
      let sprints = []
      this.$store.state.options.sprintList.forEach(x => {
        if (x.state === this.sprintLabel) {
          sprints.push(x)
        } else {
        }
      })
      return sprints
    },
    // Retrieve the full issue objects for the current sprint
    getSprintFullIssues (epics) {
      let issueKeys = ''
      this.$store.state.data.sprint.rapidView.completedIssues.forEach(x => {
        this.extractEpicFromIssue(x, epics)
        issueKeys += '\'' + x.key + '\', '
      })
      this.$store.state.data.sprint.rapidView.issuesNotCompletedInCurrentSprint.forEach(x => {
        this.extractEpicFromIssue(x, epics)
        issueKeys += '\'' + x.key + '\', '
      })
      // this.$store.state.data.sprint.rapidView.puntedIssues.forEach(x => {
      //   issueKeys += '\'' + x.key + '\', '
      // })
      // let sprintFullIssuesApi = '/rest/api/2/search?jql=key in (' + issueKeys.substr(0, issueKeys.length - 2) + ')&sprintId=' + this.$store.state.data.sprint.info.id

      this.$issueTracker.getSprintIssues(this.$store.state.data.board.id,
        this.$store.state.data.sprint.info.id,
        issueKeys.substr(0, issueKeys.length - 2))
        .then(response => {
          this.$store.commit('SET_SPRINT_FULL_ISSUES', response.data.issues)
        })
        .catch(reason => {
          console.log(reason)
        })
    },
    extractEpicFromIssue (issue, epics) {
      console.log(issue)
      if (issue.epicField !== undefined) {
        let iss = epics.find(x => { return x.epicKey === issue.epicField.epicKey })
        if (iss !== undefined) {
          iss['issueCount'] += 1
        } else {
          issue.epicField['issueCount'] = 1
          epics.push(issue.epicField)
        }
      }
    },
    // Retrieve all issues in the backlog
    getBacklog () {
      this.$issueTracker.getSprintBacklog(this.$store.state.data.board.id)
        .then(response => {
          this.$store.commit('SET_SPRINT_BACKLOG', response.data.issues)
          this.nextPage()
        })
    },
    nextPage () {
      if (this.ready.count === ++this.ready.hits) {
        this.$router.push({ name: 'scrumDashboard' })
      }
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
