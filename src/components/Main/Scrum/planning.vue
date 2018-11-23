<template>
  <div style="display: flex; flex-direction: column; flex: auto">
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  name: 'planning',
  computed: {
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 30px 40px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .image {
    border-radius: 5px
  }

  .new {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    flex-basis: 25%;
    margin: 2px;
    font-size: 15pt
  }

  .inprogress {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    flex-basis: 25%;
    margin: 2px;
    font-size: 15pt
  }

  .implemented {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    flex-basis: 25%;
    margin: 2px;
    font-size: 15pt
  }

  .done {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    flex-basis: 25%;
    margin: 2px;
    font-size: 15pt
  }

  .parkNLot {
    display: flex;
    flex-direction: column;
    font-family: helvetica;
    font-size: 12pt;
    padding-top: 50px;
    padding-left:25px;
    border-left: solid, black, 2pt
  }

  .welcome {
    color: #555;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .column-title {
    color: #2c3e50;
    font-size: 14pt;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 12px;
    margin-left: 7px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
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
</style>
