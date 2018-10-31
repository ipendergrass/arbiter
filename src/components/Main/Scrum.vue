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
        { title: 'Dashboard', page: 'scrumDashboard', icon: 'dashboard' },
        { title: 'Daily', icon: 'today' },
        { title: 'Grooming', icon: 'compare_arrows' },
        { title: 'Refresh', icon: 'refresh' },
        { title: 'Login', page: 'login', icon: 'person' }
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
