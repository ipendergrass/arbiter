<template>
    <router-view/>
</template>

<script>
export default {
  name: 'Kanban',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    loadKanbanNavigation () {
      let items = [
        { title: 'Dashboard', page: 'KanbanDashboard', icon: 'dashboard' },
        { title: 'Daily', icon: 'today' },
        { title: 'Games', page: 'game', icon: 'videogame_asset' },
        { title: 'Refresh', icon: 'refresh' },
        { title: 'Login', page: 'login', icon: 'person' }
      ]

      this.$store.commit('SET_MENU_ITEMS', items)
    }
  },
  created () {
    this.loadKanbanNavigation()
  }
}
</script>
<style>

</style>
