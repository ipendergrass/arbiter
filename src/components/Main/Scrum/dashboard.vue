<template>
  <div class="myContainer">
    <div style="display:flex; flex-direction: row; justify-content: space-between">
      <v-card max-height="150px" dark style="flex-basis: 20%; margin: 30px">
        <!--<v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>-->
        <v-card-text style="font-size: 14pt; color: orange; margin-bottom: -40px">
          <span v-if="$store.state.data.sprint.info.state !== 'closed'">Projected </span>Sprint Velocity
        </v-card-text>
        <v-card-title>
          <div style="font-size: 40pt; width:100%; margin-bottom: -20px">
            <div>{{currentSprintVelocity}}</div>
            <div style="font-size: 10pt; margin-top: -15px; margin-bottom: 15px">points</div>
          </div>
        </v-card-title>
        <!--<v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>-->
      </v-card>
      <v-card max-height="150px" dark style="flex-basis: 20%; margin: 30px">
        <v-card-text style="font-size: 14pt; color: orange; margin-bottom: -40px">
          Average Velocity
        </v-card-text>
        <v-card-title>
          <div style="font-size: 40pt; width:100%; margin-bottom: -20px">
            {{stats.averageVelocity}}
            <div style="font-size: 10pt; margin-top: -15px; margin-bottom: 15px">points</div>
          </div>
        </v-card-title>
      </v-card>
      <v-card max-height="150px" dark style="flex-basis: 20%; margin: 30px">
        <v-card-text style="font-size: 14pt; color: orange; margin-bottom: -40px">
          Headway
        </v-card-text>
        <v-card-title>
          <div style="font-size: 40pt; width:100%; margin-bottom: -20px">
            {{headway}}
            <div style="font-size: 10pt; margin-top: -15px; margin-bottom: 15px">sprints</div>
          </div>
        </v-card-title>
      </v-card>
    </div>
    <div style="display:flex; flex-direction: row; flex: auto">
      <div style="display:flex; flex-direction: column; flex-basis:35%">
        <div style="display:flex; flex-direction: row; justify-content: center">
          <v-card class="elevation-5" style="padding: 15px; margin: 5px">
            <v-card-title style="font-size: 14pt"><b>Sprint Health</b></v-card-title>
            <div style="display: flex; flex; flex-direction: row">
              <v-card width=150 style="margin: 5px">
                <v-progress-circular
                  :rotate="270"
                  :size="100"
                  :width="5"
                  :value="completedPointsPercent"
                  color="teal">
                  <span style="font-size: 20pt">{{ completedPointsPercent }}%</span>
                </v-progress-circular>
                  <v-card-title>
                    <div style="font-size: 14pt; width: 100%">
                      Completed
                    </div>
                  </v-card-title>
              </v-card>
            <v-card width=150 style="margin: 5px">
              <v-progress-circular
                :rotate="270"
                :size="100"
                :width="5"
                :value="implementedPointsPercent"
                color="orange">
                <span style="font-size: 20pt">{{ implementedPointsPercent }}%</span>
              </v-progress-circular>
              <v-card-title>
                <div style="font-size: 14pt; width: 100%">
                  Implemented
                </div>
              </v-card-title>
            </v-card>
            </div>
            <div style="display: flex; flex; flex-direction: row">
            <v-card width=150 style="margin: 5px">
              <v-progress-circular
                :rotate="270"
                :size="100"
                :width="5"
                :value="carryOverPointsPercent"
                color="orange">
                <span style="font-size: 20pt">{{ carryOverPointsPercent }}%</span>
              </v-progress-circular>
              <v-card-title>
                <div style="font-size: 14pt; width: 100%">
                  Carry Over
                </div>
              </v-card-title>
            </v-card>
            </div>
          </v-card>

          <v-card class="elevation-5" style="padding: 15px; margin: 5px">
            <v-card-title style="font-size: 14pt"><b>Backlog Health</b></v-card-title>
            <div style="display: flex; flex; flex-direction: row">
              <v-card width=150 style="margin: 5px">
                <v-progress-circular
                  :rotate="270"
                  :size="100"
                  :width="5"
                  :value="groomedPointsPercent"
                  color="orange">
                  <span style="font-size: 20pt">{{ groomedPointsPercent }}%</span>
                </v-progress-circular>
                <v-card-title>
                  <div style="font-size: 14pt; width: 100%">
                    Dev Groomed
                  </div>
                </v-card-title>
              </v-card>

              <v-card width=150 style="margin: 5px">
                <v-progress-circular
                  :rotate="270"
                  :size="100"
                  :width="5"
                  :value="withEpicsPointsPercent"
                  color="orange">
                  <span style="font-size: 20pt">{{ withEpicsPointsPercent }}%</span>
                </v-progress-circular>
                <v-card-title>
                  <div style="font-size: 14pt; width: 100%">
                    With Epics
                  </div>
                </v-card-title>
              </v-card>
            </div>
            <div style="display: flex; flex; flex-direction: row">
              <v-card width=150 style="margin: 5px">
                <v-progress-circular
                  :rotate="270"
                  :size="100"
                  :width="5"
                  :value="uxGroomedPointsPercent"
                  color="orange">
                  <span style="font-size: 20pt">{{ uxGroomedPointsPercent }}%</span>
                </v-progress-circular>
                <v-card-title>
                  <div style="font-size: 14pt; width: 100%">
                    UX Groomed
                  </div>
                </v-card-title>
              </v-card>

              <v-card width=150 style="margin: 5px">
                <v-progress-circular
                  :rotate="270"
                  :size="100"
                  :width="5"
                  :value="withEstimatesPercent"
                  color="orange">
                  <span style="font-size: 20pt">{{ withEstimatesPercent }}%</span>
                </v-progress-circular>
                <v-card-title>
                  <div style="font-size: 14pt; width: 100%">
                    Estimated
                  </div>
                </v-card-title>
              </v-card>
            </div>
          </v-card>
        </div>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          :total-items="totalItems"
          class="elevation-5">
          <template dark slot="items" slot-scope="props">
            <td style="text-align: left"><span style="font-size: 11pt">{{ props.item.name }}</span></td>
            <td class="text-xs-center"><span style="font-size: 12pt">{{ props.item.td }}</span></td>
            <td class="text-xs-center"><span style="font-size: 12pt">{{ props.item.ip }}</span></td>
            <td class="text-xs-center"><span style="font-size: 12pt">{{ props.item.dv }}</span></td>
            <td class="text-xs-center"><span style="font-size: 12pt">{{ props.item.im }}</span></td>
            <td class="text-xs-center"><span style="font-size: 20pt">{{ props.item.done }}</span></td>
          </template>
        </v-data-table>
        <div style="display: flex; flex-direction:column; text-align: left; flex: auto; width: 100%; justify-content: center; align-items: center">
          <div style=" font-size: 40pt; color: silver">
            {{$store.state.data.sprint.info.name}}
          </div>
        </div>
      </div>
      <div style="display:flex; flex-direction: column; flex-basis:45%; align-items: center">
        <v-card>
          <v-card-title style="font-size: 14pt; width: 100%; font-weight: bold; text-align: right">Burndown Chart</v-card-title>
          <burndown style="width: 600px" v-if="showBurndownData()" :chart-data="datacollection" :options="{ legend: { display: false }, scales: { xAxes: [{ type: 'time', distribution: 'linear' }] } }"></burndown>
        </v-card>
      </div>
      <div style="display:flex; flex-direction: column; flex-basis: 20%; margin: 5px">
        <v-card class="elevation-5">
          <v-toolbar color="#424242">
            <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
            <v-spacer></v-spacer>

            <v-toolbar-title style="color: white">Sprint Epics <span style="background: white; color: #424242; font-weight: bold; text-align: center; border-radius: 15px; padding: 4px">{{$store.state.data.sprint.epics.length}}</span></v-toolbar-title>

            <v-spacer></v-spacer>

            <!--<v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>-->
          </v-toolbar>

          <v-list two-line style="height: 650px; overflow: auto">
            <template v-for="(epic) in $store.state.data.sprint.epics">
              <!--<v-subheader
                v-if="epic.text"
                :key="epic.epicKey"
              >
              </v-subheader>-->

              <!--<v-divider
                v-else-if="epic.divider"
                :inset="epic.inset"
                :key="index"
              ></v-divider>-->

              <v-list-tile
                :key="epic.epicKey"
                avatar>
                <!--<v-list-tile-avatar>
                  <img :src="epic.avatar">
                </v-list-tile-avatar>-->

                <v-list-tile-content>
                  <v-list-tile-title>{{ epic.epicKey }} <span style="margin: 25px">({{epic.issueCount}})</span></v-list-tile-title>
                  <v-list-tile-sub-title>{{ epic.text | truncateEpic }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Burndown from '../../Parts/Burndown.js'
export default {
  name: 'dashboard',
  components: {
    Burndown
  },
  data () {
    return {
      totalItems: 2,
      stats: {
        comittedPoints: 0,
        averageVelocity: '?',
        headway: 0,
        toDoCount: 0,
        inProgressCount: 0,
        devVerifyCount: 0,
        implementedCount: 0,
        doneCount: 0,
        toDoEstimate: 0,
        devVerifyEstimate: 0,
        inProgressEstimate: 0,
        implementedEstimate: 0,
        doneEstimate: 0,
        pointTotal: 0,
        countTotal: 0
      },
      backlogStats: {
        allPoints: 0,
        uxGroomedPoints: 0,
        withEpicsPoints: 0,
        withEstimates: 0,
        groomedPoints: 0,
        ungroomedPoints: 0
      },
      datacollection: [],
      burndownData: [],
      previousSprints: {
        points: 0,
        issues: 0
      },
      headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'To Do', value: 'td' },
        { text: 'In Progress', value: 'ip' },
        { text: 'Dev Verify', value: 'dv' },
        { text: 'Implemented', value: 'im' },
        { text: 'Done', value: 'done' }
      ],
      items: []
    }
  },
  filters: {
    truncateEpic: function (value) {
      let charCount = 40
      if (value.length >= charCount) {
        return value.slice(0, charCount) + '...'
      } else {
        return value
      }
    }
  },
  computed: {
    velocity: function () {
      return this.stats.doneEstimate
    },
    completedPointsPercent: function () {
      return Math.round(100 * this.stats.doneEstimate / this.stats.pointTotal)
    },
    implementedPointsPercent: function () {
      return Math.round(100 * (this.stats.doneEstimate + this.stats.implementedEstimate) / this.stats.pointTotal)
    },
    carryOverPointsPercent: function () {
      return Math.round(100 * this.previousSprints.points / this.stats.pointTotal)
    },
    headway: function () {
      return (this.backlogStats.groomedPoints / this.stats.averageVelocity).toFixed(2)
    },
    currentSprintVelocity: function () {
      if (this.$store.state.data.sprint.info.state === 'closed') {
        return this.stats.doneEstimate
      }
      return Math.round(this.stats.doneEstimate + this.stats.doneEstimate * ((this.getCurrentSprintSpanInWeeks(this.$store.state.data.sprint.info) - this.getCurrentSprintSpentInWeeks(this.$store.state.data.sprint.info)) / this.getCurrentSprintSpanInWeeks(this.$store.state.data.sprint.info)))
    },

    groomedPointsPercent: function () {
      return Math.round(100 * this.backlogStats.groomedPoints / this.backlogStats.allPoints)
    },
    uxGroomedPointsPercent: function () {
      return Math.round(100 * this.backlogStats.uxGroomedPoints / this.backlogStats.allPoints)
    },
    withEpicsPointsPercent () {
      return Math.round(100 * this.backlogStats.withEpicsPoints / this.backlogStats.allPoints)
    },
    withEstimatesPercent () {
      return Math.round(100 * this.backlogStats.withEstimates / this.$store.state.data.backlog.length)
    }
  },
  methods: {
    showBurndownData () {
      return true
    },
    // Calculate sprint metrics [toDo, inProgress, devVerify, implemented, done]
    calculateSprintMetrics (stats, rapidView) {
      stats.committedPoints = rapidView.allIssuesEstimateSum.value

      rapidView.issuesNotCompletedInCurrentSprint.forEach(x => {
        switch (x.statusName.toLowerCase()) {
          case 'new':
          case 'open':
          case 'reopened':
          case 'ready for dev':
            stats.toDoCount++
            stats.toDoEstimate += x.currentEstimateStatistic.statFieldValue.value !== undefined
              ? x.currentEstimateStatistic.statFieldValue.value : 0
            break
          case 'in progress':
          case 'assigned':
          case 'pending':
          case 'deferred':
          case 'rejected':
          case 'blocked':
            if (x.assignee === 'sys_sipdevverifier') {
              stats.devVerifyCount++
              stats.devVerifyEstimate += x.currentEstimateStatistic.statFieldValue.value !== undefined
                ? x.currentEstimateStatistic.statFieldValue.value : 0
            } else {
              stats.inProgressCount++
              stats.inProgressEstimate += x.currentEstimateStatistic.statFieldValue.value !== undefined
                ? x.currentEstimateStatistic.statFieldValue.value : 0
            }
            break
          case 'implemented':
          case 'resolved':
            stats.implementedCount++
            stats.implementedEstimate += x.currentEstimateStatistic.statFieldValue.value !== undefined
              ? x.currentEstimateStatistic.statFieldValue.value : 0
            break
        }
      })

      stats.doneCount = rapidView.completedIssues.length

      stats.doneEstimate = rapidView.completedIssuesEstimateSum.value !== undefined ? rapidView.completedIssuesEstimateSum.value : 0

      stats.countTotal = stats.toDoCount +
                         stats.inProgressCount +
                         stats.devVerifyCount +
                         stats.implementedCount +
                         stats.doneCount

      stats.pointTotal = stats.toDoEstimate +
                        stats.inProgressEstimate +
                        stats.devVerifyEstimate +
                        stats.implementedEstimate +
                        stats.doneEstimate

      this.items = [
        {
          value: false,
          name: 'Issues (' + stats.countTotal + ')',
          td: stats.toDoCount,
          ip: stats.inProgressCount,
          dv: stats.devVerifyCount,
          im: stats.implementedCount,
          done: stats.doneCount
        },
        {
          value: false,
          name: 'Points (' + stats.pointTotal + ')',
          td: stats.toDoEstimate,
          ip: stats.inProgressEstimate,
          dv: stats.devVerifyEstimate,
          im: stats.implementedEstimate,
          done: stats.doneEstimate
        }
      ]
    },
    // Calculate the number and percentage of issues that were assigned in previous sprints
    calculateSprintFlux (store) {
      console.log('calculateSprintFlux')
      let boardPreviousClosedSprints = this.getPreviousClosedBoardSprints(store)

      let issuesFromPreviousSprints = 0
      let pointsFromPreviousSprints = 0

      store.state.data.sprint.fullIssues.forEach(issue => {
        if (issue.fields.closedSprints !== undefined && issue.fields.closedSprints !== null) {
          issue.fields.closedSprints.forEach(closedSprint => {
            if (boardPreviousClosedSprints.find(x => {
              return x.id === closedSprint.id &&
                closedSprint.id !== store.state.data.sprint.info.id
            }) !== undefined) {
              issuesFromPreviousSprints++
              pointsFromPreviousSprints += issue.fields.customfield_11204
            }
          })
        }
      })
      return {issues: issuesFromPreviousSprints, points: pointsFromPreviousSprints}
    },
    // Calculate the average velocity for the current sprint.
    // average velocity = number of weeks per sprint * (sum of completed points in previous three sprints) / (sum of weeks in previous three sprints)
    async calculateAverageVelocity (store, stats, issueTracker) {
      console.log('calculateAverageVelocity')
      let boardPreviousClosedSprints = this.getPreviousClosedBoardSprints(store)

      let index = boardPreviousClosedSprints.length - 3
      let lastThreeSprints = []
      let lastThreeSprintsWeeks = 0
      let totalThreeSprintPoints = 0
      // Get full sprint information
      for (index; index < boardPreviousClosedSprints.length; index++) {
        issueTracker.getSprintReport(store.state.data.board.id, boardPreviousClosedSprints[index].id)
          .then(response => {
            lastThreeSprintsWeeks += Math.round(this.$moment(response.data.sprint.completeDate).diff(this.$moment(response.data.sprint.startDate), 'weeks', true))
            lastThreeSprints.push(response.data.contents)
            if (lastThreeSprints.length === 3) {
              totalThreeSprintPoints = lastThreeSprints.reduce((accumulator, x) => {
                return accumulator + x.completedIssuesEstimateSum.value
              }, 0)

              stats.averageVelocity = Math.round((totalThreeSprintPoints / lastThreeSprintsWeeks) * 2)
            }
          })
      }
    },
    // get the three sprints prior to the targetSprint
    getPreviousClosedBoardSprints (store) {
      return store.state.options.sprintList.filter(x => {
        return x.state === 'closed' &&
          x.originBoardId === store.state.data.board.id &&
          x.id !== store.state.data.sprint.info.id &&
          this.$moment(store.state.data.sprint.info.startDate).isAfter(this.$moment(x.startDate))
      })
    },
    calculateBacklogStats (issues, backlogStats) {
      this.$store.state.data.backlog.forEach(x => {
        if (x.fields.labels !== null && x.fields.labels !== undefined) {
          backlogStats.allPoints += x.fields.customfield_11204 !== null ? x.fields.customfield_11204 : 0
          if (x.fields.labels.includes('groomed-team1')) {
            backlogStats.groomedPoints += x.fields.customfield_11204
          }

          if (x.fields.labels.includes('UX_Groomed')) {
            backlogStats.uxGroomedPoints += x.fields.customfield_11204
          }
        }
        if (x.fields.epic !== undefined) {
          backlogStats.withEpicsPoints += x.fields.customfield_11204 !== null ? x.fields.customfield_11204 : 0
        }
        if (x.fields.customfield_11204 !== undefined && x.fields.customfield_11204 !== null) {
          backlogStats.withEstimates++
        }
      })
    },
    getCurrentSprintSpanInWeeks (sprint) {
      return Math.round(this.$moment(sprint.endDate).diff(this.$moment(sprint.startDate), 'week', true))
    },
    getCurrentSprintSpentInWeeks (sprint) {
      if (sprint.completeDate) {
        return this.$moment(sprint.completeDate).diff(this.$moment(sprint.startDate), 'week', true)
      }

      return this.$moment(Date.now()).diff(this.$moment(sprint.startDate), 'week', true)
    },
    populateBurndown (boardId, sprintId) {
      console.log('Populate Burndown Chart')
      this.$issueTracker.getBurndown(boardId, sprintId)
        .then(response => {
          let start = this.$moment(response.data.startTime)
          // let end = this.$moment(response.data.endTime).toString()
          let changes = response.data.changes
          let issuesAddedBeforeSprintStart = []
          let issuesAddedAfterSprintStart = []
          let initPoints = 0
          let latestValues = {}

          for (var key in changes) {
            let change = changes[key][0]
            if (change.statC !== undefined && change.statC.newValue !== undefined) {
              latestValues[change.key] = change.statC.newValue
            }
            if (Number(response.data.startTime) > Number(key) && change.added) {
              issuesAddedBeforeSprintStart.push({change: change})
            }
            // if (change.column !== undefined && (change.column.newStatus === '1' || change.column.newStatus === '10000' || change.column.newStatus === '6')) {
            //   console.log(change.key + ' ' + change.column.newStatus)
            // }
          }

          let count = 0
          for (var keey in changes) {
            let change = changes[keey][0]
            if (change.statC !== undefined) {
              let issue = issuesAddedBeforeSprintStart.find(x => {
                return x.change.key === change.key
              })
              if (issue !== undefined && count < issuesAddedBeforeSprintStart.length) {
                count++
                if (change.statC !== undefined && change.statC.newValue !== undefined) {
                  issue.estimate = change.statC.newValue
                  initPoints += issue.estimate
                }
              }
            }
          }

          this.burndownData.push({ t: start, y: initPoints })

          for (var keeey in changes) {
            let change = changes[keeey][0]
            if ((Number(response.data.startTime) <= Number(keeey))) {
              if (change.statC !== undefined) {
                if (change.statC.oldValue !== undefined) {
                  initPoints += (change.statC.newValue - change.statC.oldValue)
                } else {
                  if (change.statC.newValue !== undefined && change.statC.newValue !== 0) {
                    initPoints += change.statC.newValue
                  }
                }
              }
              if (change.column !== undefined && change.column.newStatus === '6') {
                initPoints -= latestValues[change.key]
              }
              this.burndownData.push({ t: this.$moment(Number(keeey)), y: initPoints })
              issuesAddedAfterSprintStart.push({change: change})
            }
          }

          // for (var key in changes) {
          //   let change = changes[key][0]

          //   // if (change.statC !== undefined) {
          //   //   console.log(change.key)
          //   //   console.log(change.statC)
          //   //   //console.log(new this.$moment(Number(key)).toString())
          //   //   console.log()
          //   // }
          // }

          // console.log(issuesAddedAfterSprintStart)
          // console.log(initPoints)

          // console.log(start)
          // console.log(end)
          this.fillData()
        })
    },
    fillData () {
      this.datacollection = {
        // labels: [this.$moment(new Date('07/04/2018')), this.$moment(new Date('07/05/2018')), this.$moment(new Date('07/06/2018')), this.$moment(new Date('07/30/2018'))],
        datasets: [
          {
            // label: 'DATA',
            backgroundColor: '#424242', // '#a87979',
            data: this.burndownData,
            steppedLine: 'before',
            fill: false
          },
          {
            // label: 'Data One',
            backgroundColor: 'white', // #f87979',
            data: [{t: this.$moment(this.$store.state.data.sprint.info.startDate), y: 0}, {t: this.$moment(this.$store.state.data.sprint.info.endDate), y: 0}]
          }
        ]
      }
    }
  },
  created () {
    this.calculateSprintMetrics(this.stats, this.$store.state.data.sprint.rapidView)

    this.previousSprints = this.calculateSprintFlux(
      this.$store)

    this.calculateAverageVelocity(
      this.$store,
      this.stats,
      this.$issueTracker)

    this.calculateBacklogStats(this.$store.state.data.backlog, this.backlogStats)

    this.populateBurndown(this.$store.state.data.board.id, this.$store.state.data.sprint.info.id)
  }
}
</script>

<style>
</style>
