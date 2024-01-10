<template>
  <div class="Person">
    {{ a }}
  </div>
</template>

<script lang="ts" setup name="Person">
  import {type PersonInter} from '@/types'
  import {type Persons} from '@/types'
  import {defineProps} from 'vue'
  let Person:PersonInter= {id:"1", name:"张三", age:18}
  let a = defineProps(['a'])
  let PersonList:Persons =[
    {id:"1", name:"张三", age:18},
    {id:"2", name:"李四", age:19},
    {id:"3", name:"王五", age:20},
  ]



</script>

<style scoped>
  .Person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
  }
  button {
    margin: 0 5px;
  }
</style>