<template>
  <div style="display: flex; flex-direction: row">
    <v-navigation-drawer
      :mini-variant="mini"
      v-model="drawer"
      dark
      hide-overlay
      style="height: 100vh"
      :permanent="true">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="$store.state.auth.self.avatarUrls['48x48']">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{$store.state.auth.user}}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                icon
                @click.stop="mini = !mini"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <div v-for="item in $store.state.options.menuItems" v-bind:key="item.title">
          <v-list-tile
            :key="item.title"
            @click="click(item)"
            :style="styleNavItem(item)"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>
    <div class="myContainer" style="margin-left: 5px"><router-view/></div>
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <div v-html="result.question"></div>
        </v-card-title>

        <div v-if="result.type === 'multiple'">
          <v-divider></v-divider>

          <v-card-text  style="height: 80px">
            <ul style="text-align: left; font-size: 16pt; list-style-type: none">
              <li v-for="choice in result.multipleChoices" v-bind:key="choice">
                <div v-html="choice" :style="multipleChoiceStyle(choice, result.correct_answer)"/>
                </li>
            </ul>
          </v-card-text>
        </div>

        <v-card-text style="height: 80px">
          <div style="font-size: 16pt" v-html="result.correct_answer"  v-if="showAnswer && result.type === 'boolean'">
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div>{{result.category}}</div>
          <v-spacer></v-spacer>
          <div v-if="result.type === 'boolean'">
            True of False [{{result.difficulty}}]</div>
          <div v-if="result.type === 'multiple'">
            Multiple Choice [{{result.difficulty}}]
          </div>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="showAnswer = true"
          >
            Answer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      drawer: {},
      mini: true,
      dialog: false,
      question: '',
      answer: '',
      showAnswer: false,
      result: {
        multipleChoices: []
      }
    }
  },
  methods: {
    multipleChoiceStyle (choice, answer) {
      if (choice === answer && this.showAnswer) {
        return 'color: blue; font-weight: bold'
      }
    },
    styleNavItem (item) {
      if (item.title === 'Login' || item.title === 'Refresh') { return 'margin-top: 25vh' }
    },
    click (item) {
      switch (item.action) {
        case 'navigate':
          this.$router.push({ name: item.page })
          break
        case 'dialog':
          this.$http.get('https://opentdb.com/api.php?amount=1')
            .then(response => {
              this.result = response.data.results[0]
              this.result.multipleChoices = this.result.incorrect_answers.concat([this.result.correct_answer]).sort(function () { return 0.5 - Math.random() })
              this.showAnswer = false
              this.dialog = true
            })
          break
        default:
          break
      }
    }
  },
  created () {
  }
}
</script>

<style>

.myContainer {
  display: flex;
  flex-direction: column;
  flex: auto
}

</style>
