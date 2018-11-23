<template>
  <div style="display: flex; flex-direction: column; flex: auto">
    <daily :members="members" :sipFilter="false" v-on:memberChanged="memberChanged" ></daily>
    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <div class="new">
        <span class="column-title">To Do</span>
        <hr>
        <issue v-for="iss in newIssues"
          v-bind:key="iss.key"
          :jira="iss"
          style="margin-bottom: 20px"></issue>
      </div>

      <div class="inprogress">
        <span class="column-title">In Progress</span>
        <hr>
        <issue v-for="iss in inProgress"
          v-bind:key="iss.key"
          :jira="iss"
          style="margin-bottom: 20px"></issue>
      </div>

      <div class="implemented">
       <span class="column-title">Implemented (Merged, Ready for QA)</span>
       <hr>
       <issue v-for="iss in implemented"
          v-bind:key="iss.key"
          :jira="iss"
          style="margin-bottom: 20px"></issue>
      </div>

      <div class="done">
        <span class="column-title">Done</span>
        <hr>
        <issue v-for="iss in done"
          v-bind:key="iss.key"
          :jira="iss"
          style="margin-bottom: 20px"></issue>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; flex: auto; justify-content: flex-end; align-items: flex-end">
      <span style="font-size: 45pt; color: silver; padding-right: 25px">{{member.label}}</span>
    </div>
  </div>
</template>

<script>
import Daily from '../../Parts/Daily.vue'
import Issue from '../../Parts/Issue.vue'

export default {
  components: {
    Daily,
    Issue
  },
  data () {
    return {
      lastPerson: false,
      parkNLotItem: '',
      parkNLotItems: [],
      newIssues: [],
      inProgress: [],
      implemented: [],
      done: [],
      errors: [],
      issues: {},
      options: [], // [{key: 'Loading...', value: 'Loading...'}],
      value: '',
      nextIcon: 'el-icon-loading',
      nextText: 'Loading',
      closeIcon: 'el-icon-close',
      min: '0',
      sec: '00',
      now: '',
      date: '',
      timerColor: 'black',
      timerBackground: 'gray',
      timerFontSize: '20pt',
      members: this.$store.state.settings.members.concat().sort(function () { return 0.5 - Math.random() }),
      member: {
        label: '',
        value: ''
      }
    }
  },
  name: 'landing-page',
  computed: {
    seconds () {
      return Math.trunc(this.$moment.duration(this.date.diff(this.now)).asSeconds() % 60)
    },
    minutes () {
      return Math.trunc(this.$moment.duration(this.date.diff(this.now)).asMinutes())
    }
  },
  methods: {
    memberChanged (v1) {
      console.log(v1)
      this.member = v1
      this.value = v1.value
      this.newIssues = []
      this.inProgress = []
      this.implemented = []
      this.done = []
      if (this.issues[this.value] !== 'undefined' && this.value in this.issues) {
        this.issues[this.value].forEach(x => {
          switch (x.statusName.toLowerCase()) {
            case 'new':
            case 'open':
            case 'reopened':
            case 'ready for dev':
              this.newIssues.push(x)
              break
            case 'in progress':
            case 'assigned':
            case 'pending':
            case 'deferred':
            case 'rejected':
            case 'blocked':
              this.inProgress.push(x)
              break
            case 'implemented':
            case 'resolved':
              this.implemented.push(x)
              break
            case 'closed':
            case 'verified':
              this.done.push(x)
              break
          }
        })
      }
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    onSelectionChange () {
      this.timerColor = 'black'
      this.date = this.$moment(new Date()).add(2, 'm')
      let interval = window.setInterval(() => {
        this.now = this.$moment()
        this.min = this.minutes

        if (this.seconds < 10) {
          this.sec = '0' + this.seconds.toString()
        } else {
          this.sec = this.seconds
        }

        if (this.minutes === 0 && this.seconds === 0) {
          clearInterval(interval)
        } else if (this.minutes === 0 && this.seconds <= 30) {
          this.timerColor = 'red'
        } else if (this.minutes === 0) {
          this.timerColor = 'yellow'
        }
      }, 1000)
      this.newIssues = []
      this.inProgress = []
      this.implemented = []
      this.done = []
      if (this.issues[this.value] !== 'undefined') {
        if (this.value in this.issues) {
          this.issues[this.value].forEach(x => {
            switch (x.statusName.toLowerCase()) {
              case 'new':
              case 'open':
              case 'reopened':
              case 'ready for dev':
                this.newIssues.push(x)
                break
              case 'in progress':
              case 'assigned':
              case 'pending':
              case 'deferred':
              case 'rejected':
              case 'blocked':
                this.inProgress.push(x)
                break
              case 'implemented':
              case 'resolved':
                this.implemented.push(x)
                break
              case 'closed':
              case 'verified':
                this.done.push(x)
                break
            }
          })
        }
      }
    },
    stopInterval (interval) {
      clearInterval(interval)
    },
    onNextClick () {
      let index = this.scrum.findIndex(x => this.value === x.value)
      if (index === this.scrum.length - 2) {
        this.nextIcon = 'el-icon-check'
      }

      if (index < this.scrum.length - 1 && index > -1) {
        this.value = this.scrum[index + 1].value
      } else {
        this.value = this.scrum[0].value
      }
      this.onSelectionChange()
    }
  },
  created () {
    this.$store.state.data.sprint.rapidView.completedIssues.forEach(x => {
      if (this.issues[x.assignee] === undefined) {
        this.issues[x.assignee] = []
      }
      this.issues[x.assignee].push(x)
    })
    this.$store.state.data.sprint.rapidView.issuesNotCompletedInCurrentSprint.forEach(x => {
      if (this.issues[x.assignee] === undefined) {
        this.issues[x.assignee] = []
      }
      this.issues[x.assignee].push(x)
    })
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 30px 40px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .image {
    border-radius: 5px
  }

  .new {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    flex-basis: 25%;
    margin: 2px;
    font-size: 15pt
  }

  .inprogress {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    flex-basis: 25%;
    margin: 2px;
    font-size: 15pt
  }

  .implemented {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    flex-basis: 25%;
    margin: 2px;
    font-size: 15pt
  }

  .done {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    flex-basis: 25%;
    margin: 2px;
    font-size: 15pt
  }

  .parkNLot {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    font-size: 12pt;
    padding-top: 50px;
    padding-left:25px;
    border-left: solid, black, 2pt
  }

  .welcome {
    color: #555;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .column-title {
    color: #2c3e50;
    font-size: 14pt;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 12px;
    margin-left: 7px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

  .controls {
    display: flex;
    flex-direction: row;
    flex: auto;
    align-items: center;
    justify-content: space-between;
    font-family: helvetica;
    font-size: 10pt;
    padding: 25px
  }
</style>
