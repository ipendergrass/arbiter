<template>
  <div style="display: flex; flex-direction: row">
    <v-navigation-drawer
      :mini-variant.sync="mini"
      v-model="drawer"
      hide-overlay
      floating
      style="height: 100vh">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <!--<img src="https://randomuser.me/api/portraits/men/85.jpg">-->
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

        <v-list-tile
          v-for="item in $store.state.options.menuItems"
          :key="item.title"
          @click="click(item.page)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <div style="margin-left: 5px"><router-view/></div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      drawer: {},
      mini: true
    }
  },
  methods: {
    click (val) {
      switch (val) {
        case 'refresh':
          break
        default:
          this.$router.push({ name: val })
          break
      }
    }
  },
  created () {
  }
}
</script>
