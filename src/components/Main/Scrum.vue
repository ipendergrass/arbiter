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
        { title: 'scrumDashboard', page: 'scrumDashboard', icon: 'dashboard' },
        { title: 'scrumDaily', icon: 'today' },
        { title: 'scrumGrooming', icon: 'compare_arrows' },
        { title: 'refresh', icon: 'refresh' },
        { title: 'login', icon: 'person' }
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
