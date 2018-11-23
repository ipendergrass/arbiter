<template>
  <div style="display: flex; flex-direction: row; justify-content: space-evenly">
    <div style="display: flex; flex-direction: column; flex: auto">
      <div class="controls">
        <div v-if="sipFilter">
          <v-switch
            :label="scrum"
            v-model="team"
            v-on:change="filteredCalc"/>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
          <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex: auto; margin-right: 50px">
            <v-btn dark v-on:click="prev" fab small>
              <v-icon>skip_previous</v-icon>
            </v-btn>
            <v-select
              :items="members"
              label="Scrum Member"
              v-model="member"
              v-on:change="onSelectionChange"
              item-text="label"
              return-object
              outline
              style="width: 300px; margin-top: 25px">
            </v-select>
            <v-btn dark v-on:click="next" fab small>
              <v-icon>skip_next</v-icon>
            </v-btn>
          </div>
          <div style="display: flex; flex-direction: column; align-items:center; justify-content: center; height: 60px; width: 180px; font-size: 40pt; border-radius: 5pt" v-bind:style="{ color: timerColor, background: timerBackground }">
            {{min}}:{{sec}}
          </div>
        </div>
        <!--<div>
          <el-button v-on:click="reload">Reload</el-button>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
let audio = null
export default {
  data () {
    return {
      team: true,
      color: '',
      background: '',
      min: '0',
      sec: '00',
      member: undefined,
      timerColor: 'black',
      timerBackground: 'Silver',
      memberIndex: -1,
      epicColors: {
        'ghx-label-1': '#815B38',
        'ghx-label-2': '#F79232',
        'ghx-label-3': '#D39C3F',
        'ghx-label-4': '#4C9AFF',
        'ghx-label-5': '#4A6785',
        'ghx-label-6': '#8EB021',
        'ghx-label-7': '#AC707A',
        'ghx-label-8': '#654982',
        'ghx-label-9': '#F15C75',
        'ghx-label-10': '#B3D4FF',
        'ghx-label-11': '#79E2F2',
        'ghx-label-12': '#EBECF0',
        'ghx-label-13': '#57D9A3',
        'ghx-label-14': '#FF8F73'
      },
      now: ''
    }
  },
  props: {
    members: undefined,
    sipFilter: false
  },
  computed: {
    seconds () {
      return Math.trunc(this.$moment.duration(this.date.diff(this.now)).asSeconds() % 60)
    },
    minutes () {
      return Math.trunc(this.$moment.duration(this.date.diff(this.now)).asMinutes())
    }
  },
  methods: {
    fireEvent () {
      this.$emit('memberChanged', this.member)
    },
    playSound (sound) {
      if (sound && !audio) {
        audio = new Audio(sound)
        audio.play()
      }
    },
    stopSound () {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
        audio = null
      }
    },
    filteredCalc (value) {
      if (value) {
        this.opa = 0.25
        this.filtered = 'color: blue'
      } else {
        this.opa = 1
        this.filtered = 'color:black'
      }
    },
    filter (data) {
      if (data.show === 'all') {
        return true
      }
      return (!data.filter ||
              (this.team ? data.member !== undefined && data.member !== null && this.$store.state.Data.settings.members.find(x => {
                return x.label.toLowerCase() === data.member.toLowerCase()
              }) !== undefined : true)) && data.states.includes(data.status) && (data.member === this.member.value || this.member.value === '' || (data.labels !== undefined && data.labels.includes(this.$store.state.Data.settings.settings.teamLabel)))
    },
    reload () {},
    onSelectionChange () {
      this.stopSound()
      this.team = true
      this.filteredCalc(this.team)
      this.timerColor = 'white'
      this.date = this.$moment(new Date()).add(1.5, 'm')
      let interval = window.setInterval(() => {
        this.now = this.$moment()
        this.min = this.minutes
        if (this.seconds < 10) {
          this.sec = '0' + this.seconds.toString()
        } else {
          this.sec = this.seconds
        }

        if (this.minutes === 0 && this.seconds === 11) {
          this.playSound('/static/pom.mp3')
        }

        if (this.minutes === 0 && this.seconds === 0) {
          clearInterval(interval)
        } else if (this.minutes === 0 && this.seconds === 30) {
          let colr = 'ghx-label-' + Math.ceil(Math.random() * 14)
          this.timerBackground = this.epicColors[colr]
        } else if (this.minutes === 0 && this.seconds === 59) {
          let colr = 'ghx-label-' + Math.ceil(Math.random() * 14)
          this.timerBackground = this.epicColors[colr]
        }
      }, 200)
      this.fireEvent()
    },
    next () {
      console.log(this.members)
      if (this.memberIndex < this.members.length - 1) {
        this.member = this.members[++this.memberIndex]
        this.onSelectionChange()
      }
    },
    prev () {
      if (this.memberIndex > 0) {
        this.member = this.members[--this.memberIndex]
        this.onSelectionChange()
      }
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  body { font-family: 'Source Sans Pro', sans-serif; }

  main {
    display: flex;
    justify-content: space-between;
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    font-size: 12pt;
    margin-bottom: 2px
  }

  .image {
    border-radius: 5px;
    align-self: flex-end
  }

   .cardio {
     display: flex;
     flex-direction: row;
     border: 1px solid silver;
     margin: 0px 5px 1px 5px;
     padding: 0px 5px 0px 0px;
     border-radius: 0px;
     font-size: 9pt;
   }

  .el-card__body {
    display: flex;
    flex: auto;
    flex-direction: row;
  }

  .el-card:hover {
    border: 1px solid lightblue
  }

  .card_top {
    display: flex;
    flex-direction: row;
    flex: auto;
    justify-content: space-between;
    align-items: center;
    margin-top: -6px
  }

  .avatar {
  }

  .issueId {
  }

  .card_bottom {
    display: flex;
    flex-direction: row;
    flex: auto;
    justify-content: space-between
  }

  .cardSummary {
    display: flex;
    flex-wrap: wrap
  }

  .cardEstimate {
    display: flex

  }

  .epic {
    display: inline-block;
    justify-content: center;
    margin-top: 10px;
    padding: 3px;
    border: 1px Solid;
    border-radius: 5px
  }

  .exposure {
    margin-top: 5px
  }

  .priority {
    margin-top: 5px
  }

  .section {
    display: flex;
    flex-direction: row;
    flex: auto;
    font-family: helvetica;
    font-size: 10pt
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

  .issues {
    display: flex;
    min-width: 25%;
    margin: 2px;
    padding: 0px 25px 50px 25px;
    border-top: black, solid;
    flex-direction: column;
    font-family: helvetica;
    font-size: 10pt;
  }

  .separator {
    width: 100%;
    height: 3px;
    margin-bottom: 10px;
    background-color: #EBEDEF
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
