<template>
  <v-card v-bind:key="jira.key">
    <div style="display: flex; flex-direction: row">
      <div :style="styleStrip(jira)"></div>
      <div style="display: flex; flex-direction: column; margin-top: 12px">
        <img height="19px" :src="jira.typeUrl" class="image" radius="12px">
        <img height="19px" :src="jira.priorityUrl" class="image" radius="12px" style="margin-top: 15px">
      </div>
      <div style="display: flex; flex-direction: column; flex-basis: 100%; margin-left: 5px; margin-bottom:7px; margin-top: 0px">
        <div class="card_top">
          <div class="issueId">
            <span style="color: blue; font-size: 11pt; font-weight: bold">{{jira.key}}</span>
          </div>
          <div class="avatar">
            <img height="24px" :src="jira.avatarUrl" class="image" radius="12px">
          </div>
        </div>
        <div class="card_bottom">
          <div class="card_summary">
            <span style="font-size: 12pt">{{jira.summary}}</span>
          </div>
          <!--<div v-if="!squishRfv">
            <el-popover
              v-if="showEpic(jira)"
              placement="right"
              :title="jira.epicField.text"
              width="300"
              trigger="hover">
              <div slot="reference" class="epic" v-bind:style="styleEpic(jira)"  v-if="showEpic(jira)">
                {{jira.epicField.text | shortEpic}}
              </div>
            </el-popover>
            <div class="exposure">
              {{jira.extraFields !== undefined ? jira.extraFields.find(x => {return x.label === 'Exposure'}).html : 'None'}}
            </div>
            <div class="priority">
              {{jira.priorityName !== undefined ? jira.priorityName : 'None'}}
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
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
      squishRfv: false
    }
  },
  props: {
    jira: undefined
  },
  filters: {
    shortEpic: function (value) {
      if (value.length > 35) {
        return value.slice(0, 34) + ' ...'
      } else {
        return value
      }
    }
  },
  computed: {},
  methods: {
    fireEvent () {
      this.$emit('memberChanged', this.member)
    },
    showEpic (issue) {
      return issue.epicField !== undefined
    },
    styleEpic (issue) {
      return 'border-color: ' + this.epicColors[issue.epicField.epicColor] + '; background-color: ' + this.epicColors[issue.epicField.epicColor] + '; color: white'
    },
    styleStrip (issue) {
      return 'display: flex; flex-direction: column; flex: auto; margin-right: 5px; width: 5px; background-color: ' + issue.color
    }
  },
  created () {
    console.log(this.jira)
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  body { font-family: 'Source Sans Pro', sans-serif; }

  .main {
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
    justify-content: space-between;
    align-items: center;
    margin-top: 3px
  }

  .card_bottom {
    display: flex;
    flex-direction: column;
    text-align: left
  }

  .cardSummary {
    display: flex;
    flex-wrap: wrap;
    font-size: 8pt
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
    margin-top: 5px;
    font-size: 12pt
  }

  .priority {
    margin-top: 5px;
    font-size: 12pt
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
