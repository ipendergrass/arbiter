<template>
    <router-view/>
</template>

<script>
export default {
  name: 'Scrum',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    loadScrumNavigation () {
      let items = [
        { title: 'Dashboard', action: 'navigate', page: 'scrumDashboard', icon: 'dashboard' },
        { title: 'Daily', action: 'navigate', page: 'scrumDaily', icon: 'today' },
        { title: 'Planning', action: 'navigate', page: 'scrumPlanning', icon: 'assignment' },
        { title: 'Trivia', action: 'dialog', icon: 'games' },
        { title: 'Refresh', action: 'refresh', icon: 'refresh' },
        { title: 'Login', action: 'navigate', page: 'login', icon: 'person' }
      ]

      this.$store.commit('SET_MENU_ITEMS', items)
    }
  },
  created () {
    this.loadScrumNavigation()
  }
}
</script>
<style>

</style>
