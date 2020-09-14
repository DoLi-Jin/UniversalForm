<template>
  <div class="hello">
    <FormBox></FormBox>
  </div>
</template>

<script>
import FormBox from './formBox'

export default {
  name: 'index',
  components:{ FormBox },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{ background: lightgoldenrodyellow; width:100%; height:100%; position: absolute; left: 0; top: 0; }
</style>
