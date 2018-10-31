<template>
    <div style="display: flex; flex-direction: column">
        <div>Kanban Board</div>
    </div>
</template>
<script>
//   import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  name: 'Kanban',
  components: {},
  computed: {},
  filters: {},
  methods: {
  },
  created () {
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  body { font-family: 'Source Sans Pro', sans-serif; }

 .text {
    color: white;
    font-size: 14pt;
    font-weight: bold
  }

  .item {
    padding: 18px 0;
  }

   .cardib {
     display: flex;
     flex-direction: column;
     justify-content: center;
     flex-basis: 75%;
     border: 1px solid silver;
     font-size: 16pt;
     background-color: #0000FF
   }

  .el-card:hover {
    border: 1px solid lightblue
  }

  .numberPaddle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    color: #0000FF;
    border: 1px outset #0000FF;
    font-weight: bold;
    font-size: 16pt
  }
</style>
