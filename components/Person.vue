<template>
  <div class="person">
    <h2>汽车信息:一辆{{car.brand}}车,价值{{car.price}}万</h2>
    <button @click="changePrice">涨价</button>
    <br>
    <h2>游戏列表</h2>
    <ul>
      <li v-for="game in games" :key="game.id">
        {{game.name}}-{{game.price}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref } from 'vue'
  import { reactive } from "vue";
  // data
  let car = reactive({brand:"BMW",price:1000000})
  let a = ref(1)
  let games =[
    {id:1,name:"LOL",price:100},
    {id:2,name:"DNF",price:100},
    {id:3,name:"CF",price:100},
  ]

  // methods
  function changePrice(){
    car.price += 100000
    a.value += 1
  }
</script>

<style scoped>
  .person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
  }
  button {
    margin: 0 5px;
  }
</style>