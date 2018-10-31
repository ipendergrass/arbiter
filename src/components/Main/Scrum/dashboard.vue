<template>
  <v-layout>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      :total-items="totalItems"
      class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.td }}</td>
        <td class="text-xs-center">{{ props.item.ip }}</td>
        <td class="text-xs-center">{{ props.item.dv }}</td>
        <td class="text-xs-center">{{ props.item.im }}</td>
        <td class="text-xs-center">{{ props.item.done }}</td>
      </template>
    </v-data-table>
    <v-flex>
      <v-card dark>
        <!--<v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>-->
        <v-card-title>
          <div style="font-size: 40pt">
            {{stats.doneEstimate}}
          </div>
        </v-card-title>
        <!--<v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>-->
      </v-card>
    </v-flex>

    <v-card
      width=200
    >
      <v-progress-circular
      :rotate="270"
      :size="150"
      :width="5"
      :value="completedPointsPercent"
      color="teal"
    >
      <span style="font-size: 20pt">{{ completedPointsPercent }}%</span>
    </v-progress-circular>
      <v-card-title>
        <div style="font-size: 14pt; width: 100%">
          Completed <br/> (Points)
        </div>
      </v-card-title>
    </v-card>
    <v-card
      width=200
    >
      <v-progress-circular
        :rotate="270"
        :size="150"
        :width="5"
        :value="implementedPointsPercent"
        color="orange"
      >
        <span style="font-size: 20pt">{{ implementedPointsPercent }}%</span>
      </v-progress-circular>
      <v-card-title>
        <div style="font-size: 14pt; width: 100%">
          Implemented <br/> (Points)
        </div>
      </v-card-title>
    </v-card>
    <v-card
      width=200
    >
      <v-progress-circular
        :rotate="270"
        :size="150"
        :width="5"
        :value="carryOverPointsPercent"
        color="orange"
      >
        <span style="font-size: 20pt">{{ carryOverPointsPercent }}%</span>
      </v-progress-circular>
      <v-card-title>
        <div style="font-size: 14pt; width: 100%">
          Carry Over <br/> (Points)
        </div>
      </v-card-title>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      totalItems: 2,
      stats: {
        comittedPoints: 0,
        averageVelocity: 0,
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
    }
  },
  methods: {
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
      stats.doneEstimate = rapidView.completedIssuesEstimateSum.value

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
    calculateSprintFlux (targetSprint, boardId, options) {
      console.log('calculateSprintFlux')
      let boardPreviousClosedSprints = this.getPreviousClosedBoardSprints(targetSprint.info,
        options,
        boardId)

      let issuesFromPreviousSprints = 0
      let pointsFromPreviousSprints = 0

      targetSprint.fullIssues.forEach(issue => {
        if (issue.fields.closedSprints !== undefined && issue.fields.closedSprints !== null) {
          issue.fields.closedSprints.forEach(closedSprint => {
            if (boardPreviousClosedSprints.find(x => {
              return x.id === closedSprint.id &&
                closedSprint.id !== targetSprint.info.id
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
    calculateAverageVelocity (sprintInfo, boardId, options, issueTracker) {
      console.log('calculateAverageVelocity')
      let boardPreviousClosedSprints = this.getPreviousClosedBoardSprints(
        sprintInfo,
        options,
        boardId)

      let index = boardPreviousClosedSprints.length - 3
      let lastThreeSprints = []
      let lastThreeSprintsWeeks = 0
      let totalThreeSprintPoints = 0
      // Get full sprint information
      for (index; index < boardPreviousClosedSprints.length; index++) {
        issueTracker.getSprintReport(boardId, boardPreviousClosedSprints[index].id)
          .then(response => {
            lastThreeSprintsWeeks += Math.round(this.$moment(response.data.sprint.completeDate).diff(this.$moment(response.data.sprint.startDate), 'weeks', true))
            lastThreeSprints.push(response.data.contents)
            if (lastThreeSprints.length === 3) {
              totalThreeSprintPoints = lastThreeSprints.reduce((accumulator, x) => {
                return accumulator + x.completedIssuesEstimateSum.value
              }, 0)
            }
            return Math.round((totalThreeSprintPoints / lastThreeSprintsWeeks) * 2)
          })
          .catch(error => {
            console.log(error)
            return undefined
          })
      }
    },
    // get the three sprints prior to the targetSprint
    getPreviousClosedBoardSprints (targetSprint, options, boardId) {
      return options.sprintList.filter(x => {
        return x.state === 'closed' &&
          x.originBoardId === boardId &&
          x.id !== targetSprint.id &&
          this.$moment(targetSprint.startDate).isAfter(this.$moment(x.startDate))
      })
    }
  },
  created () {
    this.calculateSprintMetrics(this.stats, this.$store.state.data.sprint.rapidView)

    this.previousSprints = this.calculateSprintFlux(
      this.$store.state.data.sprint,
      this.$store.state.data.board.id,
      this.$store.state.options)

    this.averageVelocity = this.calculateAverageVelocity(
      this.$store.state.data.sprint.info,
      this.$store.state.data.board.id,
      this.$store.state.options,
      this.$issueTracker)
  }
}
</script>

<style>
</style>
