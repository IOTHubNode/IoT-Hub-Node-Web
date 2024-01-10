<template>
    <Person a="哈哈"/>
</template>
  

<script setup lang="ts" name="App">
  import Person from '@/components/Person.vue'
  import {reactive} from 'vue'
  import {type Persons} from '@/types'

  let PersonList= reactive<Persons>([
    {id:"1", name:"张三", age:18},
    {id:"2", name:"李四", age:19},
    {id:"3", name:"王五", age:20},
  ])
  
</script>

<style scoped>
  
</style>